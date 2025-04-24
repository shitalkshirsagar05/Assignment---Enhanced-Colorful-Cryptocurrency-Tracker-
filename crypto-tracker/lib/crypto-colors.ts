// Define color schemes for different cryptocurrencies

interface CryptoColorScheme {
  light: string
  dark: string
}

export const getCryptoColor = (id: string): CryptoColorScheme => {
  const colorSchemes: Record<string, CryptoColorScheme> = {
    bitcoin: {
      light: "#F7931A",
      dark: "#E2761B",
    },
    ethereum: {
      light: "#627EEA",
      dark: "#3C3C3D",
    },
    tether: {
      light: "#26A17B",
      dark: "#1A9070",
    },
    xrp: {
      light: "#00AAE4",
      dark: "#0080C0",
    },
    bnb: {
      light: "#F3BA2F",
      dark: "#E6A91F",
    },
    solana: {
      light: "#9945FF",
      dark: "#14F195",
    },
    cardano: {
      light: "#0033AD",
      dark: "#002398",
    },
    polkadot: {
      light: "#E6007A",
      dark: "#CC0066",
    },
    dogecoin: {
      light: "#C2A633",
      dark: "#A48F25",
    },
    // Default color scheme
    default: {
      light: "#7B61FF",
      dark: "#5D43E0",
    },
  }

  return colorSchemes[id] || colorSchemes.default
}
