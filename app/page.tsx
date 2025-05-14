import type { Metadata } from "next"
import DiagnosticsApp from "@/components/diagnostics-app"

export const metadata: Metadata = {
  title: "AR Motor Diagnostics",
  description: "AR-based application for electric vehicle motor diagnostics",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <DiagnosticsApp />
    </main>
  )
}
