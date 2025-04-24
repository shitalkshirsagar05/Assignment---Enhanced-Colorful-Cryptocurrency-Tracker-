"use client"
import { Provider } from "react-redux"
import CryptoTable from "@/components/crypto-table"
import { store } from "@/lib/store"
import Header from "@/components/header"
import CryptoBackground from "@/components/crypto-background"

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <CryptoBackground />
        <Header />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <CryptoTable />
        </main>
      </div>
    </Provider>
  )
}
