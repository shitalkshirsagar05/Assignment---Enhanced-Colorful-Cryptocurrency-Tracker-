"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, HelpCircle, SortAsc } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { selectFilteredAssets, selectSortConfig, selectFilterConfig } from "@/lib/features/crypto/cryptoSelectors"
import { startWebSocketSimulation, setSortConfig } from "@/lib/features/crypto/cryptoSlice"
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils"
import SparklineChart from "@/components/sparkline-chart"
import FilterBar from "@/components/filter-bar"
import { getCryptoColor } from "@/lib/crypto-colors"

export default function CryptoTable() {
  const dispatch = useDispatch()
  const assets = useSelector(selectFilteredAssets)
  const sortConfig = useSelector(selectSortConfig)
  const filterConfig = useSelector(selectFilterConfig)

  useEffect(() => {
    dispatch(startWebSocketSimulation())
  }, [dispatch])

  const handleSort = (column: string) => {
    dispatch(
      setSortConfig({
        column,
        direction: sortConfig.column === column && sortConfig.direction === "asc" ? "desc" : "asc",
      }),
    )
  }

  const getSortIcon = (column: string) => {
    if (sortConfig.column !== column) {
      return <SortAsc className="h-4 w-4 text-white/50 opacity-50" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 text-yellow-400" />
    ) : (
      <ChevronDown className="h-4 w-4 text-yellow-400" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block">
          Cryptocurrency Market
        </h2>
        <p className="text-white/70 mt-2">Track real-time prices, market caps, and trading volumes</p>
      </div>

      <FilterBar />

      <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md text-white shadow-[0_0_15px_rgba(255,165,0,0.2)]">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10 hover:bg-white/5">
                <TableHead className="w-[50px] text-white/70">#</TableHead>
                <TableHead className="text-white/70">
                  <button className="flex items-center gap-1 hover:text-yellow-400" onClick={() => handleSort("name")}>
                    Name {getSortIcon("name")}
                  </button>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <button
                    className="flex items-center gap-1 ml-auto hover:text-yellow-400"
                    onClick={() => handleSort("price")}
                  >
                    Price {getSortIcon("price")}
                  </button>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <button
                    className="flex items-center gap-1 ml-auto hover:text-yellow-400"
                    onClick={() => handleSort("priceChange1h")}
                  >
                    1h % {getSortIcon("priceChange1h")}
                  </button>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <button
                    className="flex items-center gap-1 ml-auto hover:text-yellow-400"
                    onClick={() => handleSort("priceChange24h")}
                  >
                    24h % {getSortIcon("priceChange24h")}
                  </button>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <button
                    className="flex items-center gap-1 ml-auto hover:text-yellow-400"
                    onClick={() => handleSort("priceChange7d")}
                  >
                    7d % {getSortIcon("priceChange7d")}
                  </button>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="flex items-center gap-1 hover:text-yellow-400"
                      onClick={() => handleSort("marketCap")}
                    >
                      Market Cap {getSortIcon("marketCap")}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-white/50" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 border-white/10 text-white">
                          <p className="max-w-xs">Market capitalization is the total value of a cryptocurrency.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="flex items-center gap-1 hover:text-yellow-400"
                      onClick={() => handleSort("volume24h")}
                    >
                      Volume(24h) {getSortIcon("volume24h")}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-white/50" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 border-white/10 text-white">
                          <p className="max-w-xs">
                            A measure of how much of a cryptocurrency was traded in the last 24 hours.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="text-right text-white/70">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="flex items-center gap-1 hover:text-yellow-400"
                      onClick={() => handleSort("circulatingSupply")}
                    >
                      Circulating Supply {getSortIcon("circulatingSupply")}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-white/50" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 border-white/10 text-white">
                          <p className="max-w-xs">
                            The amount of coins that are circulating in the market and are tradeable by the public.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="text-right text-white/70">Last 7 Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => {
                const cryptoColor = getCryptoColor(asset.id)
                return (
                  <TableRow key={asset.id} className="border-b border-white/10 hover:bg-white/5">
                    <TableCell>{asset.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center overflow-hidden p-0.5`}
                          style={{
                            background: `linear-gradient(45deg, ${cryptoColor.light}, ${cryptoColor.dark})`,
                            boxShadow: `0 0 10px ${cryptoColor.light}40`,
                          }}
                        >
                          <div className="bg-gray-900 rounded-full h-full w-full flex items-center justify-center p-1">
                            <img
                              src={asset.image || "/placeholder.svg"}
                              alt={asset.name}
                              className="h-6 w-6 object-contain"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">{asset.name}</div>
                          <div className="text-sm text-white/70">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-white">{formatCurrency(asset.price)}</TableCell>
                    <TableCell className={`text-right ${asset.priceChange1h >= 0 ? "text-green-400" : "text-red-400"}`}>
                      <div className="flex items-center justify-end gap-1">
                        {asset.priceChange1h >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {formatPercentage(Math.abs(asset.priceChange1h))}
                      </div>
                    </TableCell>
                    <TableCell
                      className={`text-right ${asset.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {asset.priceChange24h >= 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {formatPercentage(Math.abs(asset.priceChange24h))}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right ${asset.priceChange7d >= 0 ? "text-green-400" : "text-red-400"}`}>
                      <div className="flex items-center justify-end gap-1">
                        {asset.priceChange7d >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {formatPercentage(Math.abs(asset.priceChange7d))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">{formatCurrency(asset.marketCap)}</TableCell>
                    <TableCell className="text-right text-white">
                      <div>
                        {formatCurrency(asset.volume24h)}
                        <div className="text-xs text-white/70">
                          {formatNumber(asset.volumeInAsset)} {asset.symbol}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">
                      <div>
                        {formatNumber(asset.circulatingSupply)} {asset.symbol}
                        {asset.maxSupply && (
                          <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%`,
                                background: `linear-gradient(90deg, ${cryptoColor.light}, ${cryptoColor.dark})`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <SparklineChart
                        data={asset.sparkline}
                        color={asset.priceChange7d >= 0 ? "#4ade80" : "#f87171"}
                        glowColor={asset.priceChange7d >= 0 ? "rgba(74, 222, 128, 0.5)" : "rgba(248, 113, 113, 0.5)"}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
