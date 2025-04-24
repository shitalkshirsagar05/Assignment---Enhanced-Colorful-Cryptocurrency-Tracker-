import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk } from "@/lib/store"
import { cryptoData } from "@/lib/data/crypto-data"
import { loadState, saveState } from "@/lib/localStorage"

export interface CryptoAsset {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  volumeInAsset: number
  circulatingSupply: number
  maxSupply: number | null
  sparkline: number[]
}

export interface SortConfig {
  column: string
  direction: "asc" | "desc"
}

export interface FilterConfig {
  search: string
  type: "gainers" | "losers" | null
}

interface CryptoState {
  assets: CryptoAsset[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  webSocketConnected: boolean
  sortConfig: SortConfig
  filterConfig: FilterConfig
}

// Load state from localStorage or use default
const savedState = loadState("cryptoState")

const initialState: CryptoState = savedState || {
  assets: cryptoData,
  status: "idle",
  error: null,
  webSocketConnected: false,
  sortConfig: {
    column: "rank",
    direction: "asc",
  },
  filterConfig: {
    search: "",
    type: null,
  },
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateAssetPrice(state, action: PayloadAction<{ id: string; price: number }>) {
      const { id, price } = action.payload
      const asset = state.assets.find((a) => a.id === id)
      if (asset) {
        asset.price = price
      }
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    updateAssetPercentages(
      state,
      action: PayloadAction<{
        id: string
        priceChange1h?: number
        priceChange24h?: number
        priceChange7d?: number
      }>,
    ) {
      const { id, priceChange1h, priceChange24h, priceChange7d } = action.payload
      const asset = state.assets.find((a) => a.id === id)
      if (asset) {
        if (priceChange1h !== undefined) asset.priceChange1h = priceChange1h
        if (priceChange24h !== undefined) asset.priceChange24h = priceChange24h
        if (priceChange7d !== undefined) asset.priceChange7d = priceChange7d
      }
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    updateAssetVolume(state, action: PayloadAction<{ id: string; volume24h: number }>) {
      const { id, volume24h } = action.payload
      const asset = state.assets.find((a) => a.id === id)
      if (asset) {
        asset.volume24h = volume24h
        asset.volumeInAsset = volume24h / asset.price
      }
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    setWebSocketConnected(state, action: PayloadAction<boolean>) {
      state.webSocketConnected = action.payload
    },
    updateSparklineData(state, action: PayloadAction<{ id: string; newPoint: number }>) {
      const { id, newPoint } = action.payload
      const asset = state.assets.find((a) => a.id === id)
      if (asset) {
        // Remove the first point and add the new one to maintain the same array length
        asset.sparkline = [...asset.sparkline.slice(1), newPoint]
      }
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    setSortConfig(state, action: PayloadAction<SortConfig>) {
      state.sortConfig = action.payload
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    setFilterConfig(state, action: PayloadAction<FilterConfig>) {
      state.filterConfig = action.payload
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
    clearFilters(state) {
      state.filterConfig = {
        search: "",
        type: null,
      }
      // Save state to localStorage after update
      saveState("cryptoState", state)
    },
  },
})

export const {
  updateAssetPrice,
  updateAssetPercentages,
  updateAssetVolume,
  setWebSocketConnected,
  updateSparklineData,
  setSortConfig,
  setFilterConfig,
  clearFilters,
} = cryptoSlice.actions

// Simulated WebSocket connection
let webSocketInterval: NodeJS.Timeout | null = null

export const startWebSocketSimulation = (): AppThunk => (dispatch, getState) => {
  if (webSocketInterval) {
    clearInterval(webSocketInterval)
  }

  dispatch(setWebSocketConnected(true))

  webSocketInterval = setInterval(() => {
    const { crypto } = getState()

    // Randomly select an asset to update
    const assets = crypto.assets
    const randomAssetIndex = Math.floor(Math.random() * assets.length)
    const asset = assets[randomAssetIndex]

    // Generate random price change (±0.5%)
    const priceChangePercent = (Math.random() - 0.5) * 0.01
    const newPrice = asset.price * (1 + priceChangePercent)

    // Update price
    dispatch(
      updateAssetPrice({
        id: asset.id,
        price: newPrice,
      }),
    )

    // Update percentage changes
    const randomChange1h = asset.priceChange1h + (Math.random() - 0.5) * 0.2
    const randomChange24h = asset.priceChange24h + (Math.random() - 0.5) * 0.3
    const randomChange7d = asset.priceChange7d + (Math.random() - 0.5) * 0.5

    dispatch(
      updateAssetPercentages({
        id: asset.id,
        priceChange1h: randomChange1h,
        priceChange24h: randomChange24h,
        priceChange7d: randomChange7d,
      }),
    )

    // Update volume
    const volumeChange = (Math.random() - 0.4) * 0.05 // Slightly biased towards increasing
    const newVolume = asset.volume24h * (1 + volumeChange)

    dispatch(
      updateAssetVolume({
        id: asset.id,
        volume24h: newVolume,
      }),
    )

    // Update sparkline data with new price point
    dispatch(
      updateSparklineData({
        id: asset.id,
        newPoint: newPrice,
      }),
    )
  }, 1500) // Update every 1.5 seconds
}

export const stopWebSocketSimulation = (): AppThunk => (dispatch) => {
  if (webSocketInterval) {
    clearInterval(webSocketInterval)
    webSocketInterval = null
  }
  dispatch(setWebSocketConnected(false))
}

export default cryptoSlice.reducer
