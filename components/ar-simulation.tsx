"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, ZoomIn, ZoomOut, RotateCw, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import type { MotorData } from "@/types/motor-data"

interface ARSimulationProps {
  diagnosticsData: MotorData | null
  capturedImage: string | null
  currentStep: number
}

export default function ARSimulation({ diagnosticsData, capturedImage, currentStep }: ARSimulationProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)
  const [showTemp, setShowTemp] = useState(true)
  const [showVibration, setShowVibration] = useState(true)
  const [showComponents, setShowComponents] = useState(true)

  useEffect(() => {
    // Auto-rotate effect
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!capturedImage || !diagnosticsData) {
    return (
      <Card className="bg-card/50 border border-gray-700">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Info className="h-16 w-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AR View Not Available</h3>
            <p className="text-gray-400 max-w-md">
              Please capture or upload a motor image and complete diagnostics to access the AR view.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">AR Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative bg-black rounded-md overflow-hidden h-[400px]">
                {/* Base image of the motor */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Motor AR View"
                    className="max-w-full max-h-full object-contain"
                  />

                  {showOverlay && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Simulated AR overlays */}
                      {showTemp && (
                        <>
                          <div className="absolute top-[30%] left-[35%] w-16 h-16 border-2 border-red-500 rounded-full animate-pulse">
                            <div className="absolute -right-32 -top-3 bg-red-900/80 text-white text-xs p-2 rounded">
                              Overheated region
                              <br />
                              102.7°C
                            </div>
                          </div>
                          <div className="absolute top-[45%] left-[45%] w-8 h-8 border-2 border-orange-500 rounded-full">
                            <div className="absolute -left-32 -top-3 bg-orange-900/80 text-white text-xs p-2 rounded">
                              Elevated temp
                              <br />
                              87.3°C
                            </div>
                          </div>
                        </>
                      )}

                      {showVibration && (
                        <div className="absolute top-[60%] left-[55%] w-12 h-12 border-2 border-yellow-500 rounded-full">
                          <div className="absolute -right-36 -top-3 bg-yellow-900/80 text-white text-xs p-2 rounded">
                            Abnormal vibration
                            <br />
                            4.30 mm/s²
                          </div>
                        </div>
                      )}

                      {showComponents && (
                        <>
                          <div className="absolute top-[20%] left-[20%] w-20 h-10 border-2 border-blue-500 rounded">
                            <div className="absolute right-0 -top-8 bg-blue-900/80 text-white text-xs p-1 rounded">
                              Stator windings
                            </div>
                          </div>
                          <div className="absolute top-[50%] left-[25%] w-10 h-10 border-2 border-blue-500 rounded">
                            <div className="absolute -left-24 -top-3 bg-blue-900/80 text-white text-xs p-1 rounded">
                              Rotor
                            </div>
                          </div>
                          <div className="absolute top-[70%] left-[60%] w-16 h-8 border-2 border-blue-500 rounded">
                            <div className="absolute -left-28 -top-3 bg-blue-900/80 text-white text-xs p-1 rounded">
                              Bearing housing
                            </div>
                          </div>
                        </>
                      )}

                      {/* Step-specific overlay for current repair step */}
                      {currentStep === 2 && (
                        <div className="absolute top-[40%] left-[40%] w-32 h-32 border-4 border-green-500 rounded-md animate-pulse">
                          <div className="absolute right-0 -top-12 bg-green-900/90 text-white text-xs p-2 rounded max-w-[150px]">
                            Cooling system inspection area.
                            <br />
                            Check for blockages and leaks.
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="absolute top-[35%] left-[30%] w-20 h-20 border-4 border-blue-500 rounded-full animate-pulse">
                          <div className="absolute right-0 -top-12 bg-blue-900/90 text-white text-xs p-2 rounded max-w-[150px]">
                            Coolant pump location.
                            <br />
                            Replace with new unit.
                          </div>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div className="absolute top-[65%] left-[60%] w-18 h-18 border-4 border-yellow-500 rounded-circle animate-pulse">
                          <div className="absolute -left-36 -top-3 bg-yellow-900/90 text-white text-xs p-2 rounded max-w-[150px]">
                            Bearing assembly.
                            <br />
                            Apply fresh lubrication.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Simulated holographic effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-500/5 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-10"></div>

                {/* AR interface elements */}
                <div className="absolute bottom-4 left-4 text-xs text-white bg-black/50 px-2 py-1 rounded">
                  AR Mode • {Math.floor(rotation)}° • {zoomLevel.toFixed(1)}x
                </div>

                <div className="absolute top-4 right-4 text-xs text-white bg-blue-900/70 px-2 py-1 rounded flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2"></div>
                  Motor ID: EV-M2309-{Math.floor(Math.random() * 1000)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">AR Controls</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
                    className="flex-1"
                  >
                    <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}
                    className="flex-1"
                  >
                    <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRotation((prev) => (prev - 15) % 360)}
                    className="flex-1"
                  >
                    <RotateCw className="h-4 w-4 mr-1" /> Rotate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOverlay((prev) => !prev)}
                    className="flex-1"
                  >
                    {showOverlay ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" /> Hide Overlay
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" /> Show Overlay
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Display Options</h3>
                <div className="space-y-2">
                  <Toggle
                    pressed={showTemp}
                    onPressedChange={setShowTemp}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    Temperature Data
                  </Toggle>
                  <Toggle
                    pressed={showVibration}
                    onPressedChange={setShowVibration}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    Vibration Data
                  </Toggle>
                  <Toggle
                    pressed={showComponents}
                    onPressedChange={setShowComponents}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                    Component Labels
                  </Toggle>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Live Sensor Data</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temperature:</span>
                    <span className="text-red-400 font-mono">{diagnosticsData.motorTemperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vibration:</span>
                    <span className="text-yellow-400 font-mono">{diagnosticsData.motorVibration.toFixed(2)} mm/s²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Draw:</span>
                    <span className="text-blue-400 font-mono">{diagnosticsData.batteryCurrent.toFixed(1)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RPM:</span>
                    <span className="text-green-400 font-mono">{diagnosticsData.motorSpeed}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-md">
                <h3 className="text-sm font-medium mb-2 text-blue-400">Voice Commands</h3>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>"Zoom in/out"</li>
                  <li>"Rotate left/right"</li>
                  <li>"Show/hide temperature data"</li>
                  <li>"Next/previous step"</li>
                  <li>"What's this component?"</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
