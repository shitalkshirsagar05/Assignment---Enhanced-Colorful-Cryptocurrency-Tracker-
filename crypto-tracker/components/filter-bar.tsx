"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { Filter, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { setFilterConfig, clearFilters } from "@/lib/features/crypto/cryptoSlice"
import { selectFilterConfig } from "@/lib/features/crypto/cryptoSelectors"

export default function FilterBar() {
  const dispatch = useDispatch()
  const filterConfig = useSelector(selectFilterConfig)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterConfig({ ...filterConfig, search: e.target.value }))
  }

  const handleFilterChange = (filter: string) => {
    dispatch(
      setFilterConfig({
        ...filterConfig,
        type: filter === filterConfig.type ? null : filter,
      }),
    )
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md">
      <div className="relative w-full sm:w-64">
        <Input
          placeholder="Search by name or symbol..."
          value={filterConfig.search}
          onChange={handleSearchChange}
          className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-yellow-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {filterConfig.type && (
          <Badge variant="outline" className="gap-1 bg-white/5 border-white/20 text-white">
            {filterConfig.type === "gainers" ? (
              <>
                <TrendingUp className="h-3 w-3 text-green-400" />
                Top Gainers
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-red-400" />
                Top Losers
              </>
            )}
            <button className="ml-1 text-white/70 hover:text-white" onClick={handleClearFilters}>
              ×
            </button>
          </Badge>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none hover:opacity-90"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={`${filterConfig.type === "gainers" ? "bg-white/10" : ""} focus:bg-white/20`}
                onClick={() => handleFilterChange("gainers")}
              >
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                Top Gainers (24h)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`${filterConfig.type === "losers" ? "bg-white/10" : ""} focus:bg-white/20`}
                onClick={() => handleFilterChange("losers")}
              >
                <TrendingDown className="h-4 w-4 mr-2 text-red-400" />
                Top Losers (24h)
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={handleClearFilters} className="focus:bg-white/20">
              Clear filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
