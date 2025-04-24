import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { CryptoAsset } from "./cryptoSlice"

// Basic selectors
export const selectCryptoState = (state: RootState) => state.crypto
export const selectAllAssets = (state: RootState) => state.crypto.assets
export const selectWebSocketStatus = (state: RootState) => state.crypto.webSocketConnected
export const selectSortConfig = (state: RootState) => state.crypto.sortConfig
export const selectFilterConfig = (state: RootState) => state.crypto.filterConfig

// Memoized selectors
export const selectAssetById = createSelector([selectAllAssets, (_, id: string) => id], (assets, id) =>
  assets.find((asset) => asset.id === id),
)

export const selectTopGainers = createSelector([selectAllAssets], (assets) =>
  [...assets].sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 3),
)

export const selectTopLosers = createSelector([selectAllAssets], (assets) =>
  [...assets].sort((a, b) => a.priceChange24h - b.priceChange24h).slice(0, 3),
)

export const selectTotalMarketCap = createSelector([selectAllAssets], (assets) =>
  assets.reduce((sum, asset) => sum + asset.marketCap, 0),
)

export const selectTotalVolume24h = createSelector([selectAllAssets], (assets) =>
  assets.reduce((sum, asset) => sum + asset.volume24h, 0),
)

// Filtered and sorted assets selector
export const selectFilteredAssets = createSelector(
  [selectAllAssets, selectSortConfig, selectFilterConfig],
  (assets, sortConfig, filterConfig) => {
    // First apply filters
    let filteredAssets = [...assets]

    // Apply search filter
    if (filterConfig.search) {
      const searchTerm = filterConfig.search.toLowerCase()
      filteredAssets = filteredAssets.filter(
        (asset) => asset.name.toLowerCase().includes(searchTerm) || asset.symbol.toLowerCase().includes(searchTerm),
      )
    }

    // Apply type filter
    if (filterConfig.type === "gainers") {
      filteredAssets = [...filteredAssets].sort((a, b) => b.priceChange24h - a.priceChange24h)
    } else if (filterConfig.type === "losers") {
      filteredAssets = [...filteredAssets].sort((a, b) => a.priceChange24h - b.priceChange24h)
    }

    // Then apply sorting
    return [...filteredAssets].sort((a, b) => {
      const aValue = a[sortConfig.column as keyof CryptoAsset]
      const bValue = b[sortConfig.column as keyof CryptoAsset]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })
  },
)
