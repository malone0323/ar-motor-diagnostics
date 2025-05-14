import { ScanSearch, Gauge, PenToolIcon as Tool, Zap } from "lucide-react"

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center mb-3">
        <Zap className="h-10 w-10 text-yellow-400 mr-2" />
        <h1 className="text-3xl font-bold text-center">AR Motor Diagnostics</h1>
      </div>
      <p className="text-gray-400 text-center max-w-2xl">
        Advanced augmented reality system for EV motor diagnostics, analysis, and repair guidance
      </p>
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex flex-col items-center">
          <ScanSearch className="h-6 w-6 text-blue-400 mb-1" />
          <span className="text-sm">Scan & Detect</span>
        </div>
        <div className="flex flex-col items-center">
          <Gauge className="h-6 w-6 text-green-400 mb-1" />
          <span className="text-sm">Analyze Data</span>
        </div>
        <div className="flex flex-col items-center">
          <Tool className="h-6 w-6 text-orange-400 mb-1" />
          <span className="text-sm">Repair Guidance</span>
        </div>
      </div>
    </div>
  )
}
