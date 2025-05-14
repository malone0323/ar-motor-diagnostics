"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageCapture from "@/components/image-capture"
import DataAnalytics from "@/components/data-analytics"
import MotorAssembly from "@/components/motor-assembly"
import ARSimulation from "@/components/ar-simulation"
import type { MotorData } from "@/types/motor-data"
import Header from "@/components/header"

export default function DiagnosticsApp() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [diagnosticsData, setDiagnosticsData] = useState<MotorData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleImageCaptured = (imageData: string) => {
    setCapturedImage(imageData)
    setIsAnalyzing(true)
    // Simulating API call to analyze image
    setTimeout(() => {
      fetchMotorDiagnostics(imageData)
    }, 2000)
  }

  const fetchMotorDiagnostics = async (imageData: string) => {
    try {
      const response = await fetch("/api/analyze-motor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData }),
      })

      const data = await response.json()
      setDiagnosticsData(data)
      setIsAnalyzing(false)
    } catch (error) {
      console.error("Error analyzing motor:", error)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <Tabs defaultValue="capture" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="capture">Image Capture</TabsTrigger>
          <TabsTrigger value="analytics">Diagnostics</TabsTrigger>
          <TabsTrigger value="repair">Repair Guide</TabsTrigger>
          <TabsTrigger value="ar">AR View</TabsTrigger>
        </TabsList>

        <TabsContent value="capture">
          <ImageCapture onImageCaptured={handleImageCaptured} />
        </TabsContent>

        <TabsContent value="analytics">
          <DataAnalytics diagnosticsData={diagnosticsData} isAnalyzing={isAnalyzing} capturedImage={capturedImage} />
        </TabsContent>

        <TabsContent value="repair">
          <MotorAssembly diagnosticsData={diagnosticsData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </TabsContent>

        <TabsContent value="ar">
          <ARSimulation diagnosticsData={diagnosticsData} capturedImage={capturedImage} currentStep={currentStep} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
