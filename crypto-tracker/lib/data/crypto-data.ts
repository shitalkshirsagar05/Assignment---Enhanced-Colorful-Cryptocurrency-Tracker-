import type { CryptoAsset } from "../features/crypto/cryptoSlice"

// Generate random sparkline data
const generateSparklineData = (basePrice: number, volatility: number, points = 24): number[] => {
  const data: number[] = []
  let currentPrice = basePrice

  for (let i = 0; i < points; i++) {
    // Random price movement with the given volatility
    const change = (Math.random() - 0.5) * 2 * volatility * basePrice
    currentPrice = Math.max(0.01, currentPrice + change)
    data.push(currentPrice)
  }

  return data
}

export const cryptoData: CryptoAsset[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    volumeInAsset: 467810,
    circulatingSupply: 19850000,
    maxSupply: 21000000,
    sparkline: generateSparklineData(93759.48, 0.01),
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 1802.46,
    priceChange1h: 0.6,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    volumeInAsset: 13050000,
    circulatingSupply: 120710000,
    maxSupply: null,
    sparkline: generateSparklineData(1802.46, 0.015),
  },
  {
    id: "tether",
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    price: 1.0,
    priceChange1h: 0.0,
    priceChange24h: 0.0,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    volumeInAsset: 92250000000,
    circulatingSupply: 145270000000,
    maxSupply: null,
    sparkline: generateSparklineData(1.0, 0.0005),
  },
  {
    id: "xrp",
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    volumeInAsset: 2300000000,
    circulatingSupply: 58390000000,
    maxSupply: 100000000000,
    sparkline: generateSparklineData(2.22, 0.02),
  },
  {
    id: "bnb",
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.2,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    volumeInAsset: 3080000,
    circulatingSupply: 140890000,
    maxSupply: 200000000,
    sparkline: generateSparklineData(606.65, 0.012),
  },
  {
    id: "solana",
    rank: 6,
    name: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    volumeInAsset: 32250000,
    circulatingSupply: 517310000,
    maxSupply: null,
    sparkline: generateSparklineData(151.51, 0.018),
  },
]
