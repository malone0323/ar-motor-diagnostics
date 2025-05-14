"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, RefreshCw, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ImageCaptureProps {
  onImageCaptured: (imageData: string) => void
}

export default function ImageCapture({ onImageCaptured }: ImageCaptureProps) {
  const [captureMethod, setCaptureMethod] = useState<"camera" | "upload">("camera")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Unable to access camera. Please ensure you've granted camera permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        const imageData = canvasRef.current.toDataURL("image/png")
        setCapturedImage(imageData)
        stopCamera()
        onImageCaptured(imageData)
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setCapturedImage(imageData)
        onImageCaptured(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    if (captureMethod === "camera") {
      startCamera()
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card className="bg-card/50 border border-gray-700">
      <CardContent className="p-6">
        <Tabs
          value={captureMethod}
          onValueChange={(value) => {
            setCaptureMethod(value as "camera" | "upload")
            if (value === "camera") {
              startCamera()
            } else {
              stopCamera()
            }
          }}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="mt-0">
            <div className="flex flex-col items-center">
              {cameraError && (
                <div className="bg-red-900/30 text-red-300 p-4 rounded-md mb-4 w-full">{cameraError}</div>
              )}

              <div className="relative bg-black rounded-lg overflow-hidden w-full max-w-xl aspect-video mb-4">
                {!capturedImage ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                  </>
                ) : (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured motor"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex gap-4">
                {!capturedImage ? (
                  <Button onClick={captureImage} className="bg-blue-600 hover:bg-blue-700" disabled={!cameraActive}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Motor Image
                  </Button>
                ) : (
                  <Button onClick={resetCapture} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retake Image
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="relative bg-black rounded-lg overflow-hidden w-full max-w-xl aspect-video mb-4">
                {capturedImage ? (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Uploaded motor"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <ImagePlus className="h-16 w-16 text-gray-500" />
                  </div>
                )}
              </div>

              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />

              <div className="flex gap-4">
                {!capturedImage ? (
                  <Button onClick={triggerFileInput} className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Motor Image
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button onClick={resetCapture} variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Choose Different Image
                    </Button>
                    <Button onClick={triggerFileInput} variant="default">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {capturedImage && (
          <div className="mt-6 p-4 bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Analysis Ready</h3>
            <p className="text-gray-400 mb-4">
              Your motor image has been captured. Navigate to the "Diagnostics" tab to view the AI analysis results.
            </p>
            <div className="flex items-center text-yellow-400">
              <RefreshCw className="animate-spin h-4 w-4 mr-2" />
              Processing image using computer vision and AI models...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
