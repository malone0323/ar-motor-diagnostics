"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Check, HelpCircle, ThermometerSun, Zap, Vibrate, AlertCircle } from "lucide-react"
import type { MotorData } from "@/types/motor-data"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DataAnalyticsProps {
  diagnosticsData: MotorData | null
  isAnalyzing: boolean
  capturedImage: string | null
}

export default function DataAnalytics({ diagnosticsData, isAnalyzing, capturedImage }: DataAnalyticsProps) {
  const [sampleData, setSampleData] = useState<any[]>([])

  useEffect(() => {
    // Fetch sample data for charts
    const fetchSampleData = async () => {
      try {
        const response = await fetch("/api/motor-data")
        const data = await response.json()
        setSampleData(data.slice(0, 24)) // Use first 24 records for visualization
      } catch (error) {
        console.error("Error fetching motor data:", error)
      }
    }

    fetchSampleData()
  }, [])

  if (!capturedImage) {
    return (
      <Card className="bg-card/50 border border-gray-700">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <HelpCircle className="h-16 w-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Image Captured</h3>
            <p className="text-gray-400 max-w-md">
              Please capture or upload a motor image in the Image Capture tab to enable AI diagnostics.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isAnalyzing) {
    return (
      <Card className="bg-card/50 border border-gray-700">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-20"></div>
              <div className="relative inline-flex rounded-full h-16 w-16 bg-blue-500 items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Motor...</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Our AI is processing your motor image using computer vision and machine learning to detect issues.
            </p>
            <Progress value={45} className="w-64 mb-2" />
            <p className="text-xs text-gray-500">Analyzing motor components (45%)</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Use mock data if no real data is available
  const motorData = diagnosticsData || {
    timestamp: "12:05:50",
    motorSpeed: 2182,
    torque: 395.51,
    motorTemperature: 102.7,
    batteryVoltage: 609.89,
    batteryCurrent: 148.17,
    powerOutput: "90367.08",
    stateOfCharge: 33.37,
    stateOfHealth: 93.32,
    phaseCurrentI1: 4.44,
    phaseCurrentI2: 299.23,
    phaseCurrentI3: 140.29,
    phaseVoltageV1: 450.25,
    phaseVoltageV2: 281.41,
    phaseVoltageV3: 201.04,
    powerFactor: 0.75,
    currentImbalance: 3.42,
    voltageImbalance: 2.29,
    harmonicDistortion: 8.85,
    motorVibration: 4.3,
    motorNoiseLevel: 68.9,
    rotorSpeedDeviation: -0.97,
    rotorPosition: 236.25,
    bearingTemperature: 57.53,
    lubricationStatus: "Dry",
    motorSurfaceTemperature: 64.95,
    coolantFlowRate: 1.3,
    airflowRate: 146.78,
    thermalResistance: 0.22,
    overloadDuration: "293",
    faultCode: "P0AC3",
    anomalyScore: 0.42,
    predictiveFailureTime: 4501.4,
    degradationRate: 0.4,
    maintenanceLogs: "Routine Check",
    lifetimeUsageHours: 14402,
    ambientTemperature: 11.49,
    humidityLevel: 71.0,
    roadCondition: "Wet",
    drivingMode: "Sport",
    loadWeight: 1463,
    faultType: "Overheat",
    severityLevel: "Warning",
  }

  const getHealthStatus = () => {
    const score = motorData.anomalyScore
    if (score < 0.3) return { status: "Healthy", color: "text-green-500", icon: Check }
    if (score < 0.6) return { status: "Warning", color: "text-yellow-500", icon: AlertTriangle }
    return { status: "Critical", color: "text-red-500", icon: AlertCircle }
  }

  const healthStatus = getHealthStatus()
  const HealthIcon = healthStatus.icon

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 border border-gray-700 col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <div className={`mr-2 ${healthStatus.color}`}>
                <HealthIcon className="h-5 w-5" />
              </div>
              Motor Diagnostics Results
            </CardTitle>
            <CardDescription>Analysis completed at {motorData.timestamp}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Fault Detected</h3>
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-lg font-semibold">{motorData.faultType}</span>
                  </div>
                  <p className="text-sm text-gray-500">Code: {motorData.faultCode}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Severity</h3>
                  <div
                    className={`text-lg font-semibold ${
                      motorData.severityLevel === "Critical"
                        ? "text-red-500"
                        : motorData.severityLevel === "Warning"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {motorData.severityLevel}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Predicted Time to Failure</h3>
                  <div className="text-lg font-semibold">{Math.round(motorData.predictiveFailureTime)} hours</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Primary Issue</h3>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <ThermometerSun className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-semibold">High Motor Temperature</span>
                    </div>
                    <p className="text-sm text-gray-400 ml-7">{motorData.motorTemperature}°C (Normal: 70-85°C)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Secondary Issues</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Vibrate className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>Increased Vibration ({motorData.motorVibration} mm/s²)</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>Phase Current Imbalance ({motorData.currentImbalance}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Recommended Actions</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                    <span className="block h-3 w-3" />
                  </div>
                  <span>Check cooling system for blockages or failures</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                    <span className="block h-3 w-3" />
                  </div>
                  <span>Inspect bearing lubrication status (currently: {motorData.lubricationStatus})</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                    <span className="block h-3 w-3" />
                  </div>
                  <span>Check for phase wiring issues causing current imbalance</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Motor Image Analysis</CardTitle>
            <CardDescription>Computer vision diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-md overflow-hidden mb-4">
              <img src={capturedImage || "/placeholder.svg"} alt="Motor" className="w-full h-auto" />
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Simulated AR overlays */}
                <div className="absolute top-[30%] left-[35%] w-16 h-16 border-2 border-red-500 rounded-full animate-pulse">
                  <div className="absolute -right-32 -top-3 bg-red-900/80 text-white text-xs p-2 rounded">
                    Overheated region
                    <br />
                    102.7°C
                  </div>
                </div>
                <div className="absolute top-[60%] left-[50%] w-12 h-12 border-2 border-yellow-500 rounded-full">
                  <div className="absolute -right-36 -top-3 bg-yellow-900/80 text-white text-xs p-2 rounded">
                    Lubrication issue
                    <br />
                    Check bearings
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Detected Components</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Stator Windings</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Rotor Assembly</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Cooling System</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Bearings</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Performance Metrics</CardTitle>
          <CardDescription>Historical data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="vibration">Vibration</TabsTrigger>
              <TabsTrigger value="current">Current</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="mt-0">
              <div className="h-80">
                <ChartContainer
                  config={{
                    motorTemp: {
                      label: "Motor Temperature (°C)",
                      color: "hsl(var(--chart-1))",
                    },
                    bearingTemp: {
                      label: "Bearing Temperature (°C)",
                      color: "hsl(var(--chart-2))",
                    },
                    surfaceTemp: {
                      label: "Surface Temperature (°C)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleData.map((item) => ({
                        time: item.Timestamp,
                        motorTemp: item["Motor Temperature (°C)"],
                        bearingTemp: item["Bearing Temperature (°C)"],
                        surfaceTemp: item["Motor Surface Temperature (°C)"],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="motorTemp"
                        name="Motor Temperature"
                        stroke="var(--color-motorTemp)"
                      />
                      <Line
                        type="monotone"
                        dataKey="bearingTemp"
                        name="Bearing Temperature"
                        stroke="var(--color-bearingTemp)"
                      />
                      <Line
                        type="monotone"
                        dataKey="surfaceTemp"
                        name="Surface Temperature"
                        stroke="var(--color-surfaceTemp)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="vibration" className="mt-0">
              <div className="h-80">
                <ChartContainer
                  config={{
                    vibration: {
                      label: "Motor Vibration (mm/s²)",
                      color: "hsl(var(--chart-1))",
                    },
                    noise: {
                      label: "Noise Level (dB)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleData.map((item) => ({
                        time: item.Timestamp,
                        vibration: item["Motor Vibration (mm/s²)"],
                        noise: item["Motor Noise Level (dB)"] / 10, // Scale for visualization
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="vibration"
                        name="Vibration"
                        stroke="var(--color-vibration)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="noise"
                        name="Noise (scaled)"
                        stroke="var(--color-noise)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="current" className="mt-0">
              <div className="h-80">
                <ChartContainer
                  config={{
                    current1: {
                      label: "Phase Current I1 (A)",
                      color: "hsl(var(--chart-1))",
                    },
                    current2: {
                      label: "Phase Current I2 (A)",
                      color: "hsl(var(--chart-2))",
                    },
                    current3: {
                      label: "Phase Current I3 (A)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleData.map((item) => ({
                        time: item.Timestamp,
                        current1: item["Phase Current I1 (A)"],
                        current2: item["Phase Current I2 (A)"],
                        current3: item["Phase Current I3 (A)"],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="current1" name="Phase I1" stroke="var(--color-current1)" />
                      <Line type="monotone" dataKey="current2" name="Phase I2" stroke="var(--color-current2)" />
                      <Line type="monotone" dataKey="current3" name="Phase I3" stroke="var(--color-current3)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
