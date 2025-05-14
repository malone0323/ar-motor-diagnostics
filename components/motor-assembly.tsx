"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Clock, Info, PenToolIcon as Tool, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { MotorData, MotorAssemblyStep } from "@/types/motor-data"

interface MotorAssemblyProps {
  diagnosticsData: MotorData | null
  currentStep: number
  setCurrentStep: (step: number) => void
}

// Mock assembly steps data
const assemblySteps: MotorAssemblyStep[] = [
  {
    id: 1,
    title: "Safety Precautions & Preparation",
    description:
      "Ensure the vehicle is powered off and the high voltage system is properly discharged. Disconnect the 12V battery and wait at least 10 minutes for capacitors to discharge. Wear appropriate PPE including insulated gloves.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/safety_equipment.glb",
    requiredTools: ["Insulated gloves", "Safety glasses", "Multimeter"],
    safetyNotes: "Always verify absence of voltage before proceeding with work.",
    estimatedTime: "10 minutes",
  },
  {
    id: 2,
    title: "Access the Motor Assembly",
    description:
      "Remove the motor compartment cover by unscrewing the 12 mounting bolts in a cross pattern. Carefully disconnect all electrical connectors, labeling each one for reassembly. Remove cooling system connections.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/motor_cover.glb",
    requiredTools: ["10mm socket wrench", "Wire labels", "Drip tray"],
    safetyNotes: "Place a drip tray to collect any coolant that may leak during disconnection.",
    estimatedTime: "15 minutes",
  },
  {
    id: 3,
    title: "Cooling System Inspection",
    description:
      "Inspect the cooling system components, looking for blockages, leaks or damaged hoses. Check for mineral deposits that may indicate poor coolant quality. Clean radiator fins if necessary.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/cooling_system.glb",
    requiredTools: ["Flashlight", "Cleaning brush", "Compressed air"],
    safetyNotes: "Wear eye protection when using compressed air.",
    estimatedTime: "20 minutes",
  },
  {
    id: 4,
    title: "Replace Cooling Pump",
    description:
      "Remove the mounting bolts for the coolant pump. Carefully disconnect inlet and outlet hoses. Install the new pump using new O-rings and gaskets. Torque mounting bolts to 8-10 Nm.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/coolant_pump.glb",
    requiredTools: ["8mm socket wrench", "Torque wrench", "Replacement pump kit"],
    safetyNotes: "Ensure proper orientation of the pump during installation.",
    estimatedTime: "25 minutes",
  },
  {
    id: 5,
    title: "Bearing Inspection & Lubrication",
    description:
      "Access the motor bearings by removing the end caps. Inspect bearings for signs of wear or damage. Clean bearings and apply fresh high-temperature grease. Check for smooth rotation.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/motor_bearings.glb",
    requiredTools: ["Bearing puller", "High-temp grease", "Clean lint-free cloth"],
    safetyNotes: "Do not over-grease bearings as this can cause overheating.",
    estimatedTime: "30 minutes",
  },
  {
    id: 6,
    title: "Reassembly & Testing",
    description:
      "Reassemble all components in reverse order. Refill coolant system and bleed air. Reconnect all electrical connections. Test the motor at low power setting to verify proper operation and cooling.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    arModel: "/models/reassembled_motor.glb",
    requiredTools: ["Coolant", "Diagnostic scanner", "Torque wrench"],
    safetyNotes: "Ensure all connections are secure before powering on the system.",
    estimatedTime: "40 minutes",
  },
]

export default function MotorAssembly({ diagnosticsData, currentStep, setCurrentStep }: MotorAssemblyProps) {
  const [completed, setCompleted] = useState<number[]>([])

  const totalSteps = assemblySteps.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete the whole process
      setCompleted(assemblySteps.map((step) => step.id))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepComplete = (stepId: number) => {
    if (completed.includes(stepId)) {
      setCompleted(completed.filter((id) => id !== stepId))
    } else {
      setCompleted([...completed, stepId])
    }
  }

  if (!diagnosticsData) {
    return (
      <Card className="bg-card/50 border border-gray-700">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Info className="h-16 w-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Diagnostics Data</h3>
            <p className="text-gray-400 max-w-md">
              Please capture or upload a motor image and perform diagnostics first to view repair guidance.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentStepData = assemblySteps[currentStep]
  const isStepCompleted = completed.includes(currentStepData.id)
  const progress = (currentStep / (totalSteps - 1)) * 100

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Repair Guidance</CardTitle>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-blue-950/40">
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full bg-gray-700 h-2 rounded-full mb-6">
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            {assemblySteps.map((step, index) => (
              <div
                key={step.id}
                className={`absolute top-0 w-6 h-6 rounded-full -mt-2 -ml-3 flex items-center justify-center ${
                  completed.includes(step.id)
                    ? "bg-green-500 text-white"
                    : index === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-600 text-gray-300"
                }`}
                style={{ left: `${(index / (totalSteps - 1)) * 100}%` }}
              >
                {completed.includes(step.id) ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-gray-400 mb-4">{currentStepData.description}</p>

              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium flex items-center text-gray-400 mb-2">
                    <Tool className="h-4 w-4 mr-2" />
                    Required Tools
                  </h3>
                  <ul className="list-disc list-inside pl-2 text-sm text-gray-300">
                    {currentStepData.requiredTools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center text-gray-400 mb-2">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Safety Notes
                  </h3>
                  <p className="text-sm text-yellow-300 pl-6">{currentStepData.safetyNotes}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center text-gray-400 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Estimated Time
                  </h3>
                  <p className="text-sm text-gray-300 pl-6">{currentStepData.estimatedTime}</p>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {currentStep === totalSteps - 1 ? "Complete" : "Next"}
                  {currentStep !== totalSteps - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleStepComplete(currentStepData.id)}
                className={`mt-4 w-full ${isStepCompleted ? "text-green-500" : "text-gray-400"}`}
              >
                {isStepCompleted ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Incomplete
                  </>
                ) : (
                  <>Mark Step as Complete</>
                )}
              </Button>
            </div>

            <div>
              <div className="bg-black rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={currentStepData.imageUrl || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Note: In the AR app, this will display a 3D interactive model
              </p>

              <div className="mt-4 p-4 rounded-md bg-blue-900/20 border border-blue-800">
                <h3 className="text-sm font-medium mb-2 text-blue-400">AR Mode Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                      <span className="block h-2 w-2" />
                    </div>
                    <span>3D interactive model with zoom, rotate, and explode views</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                      <span className="block h-2 w-2" />
                    </div>
                    <span>Voice commands for hands-free operation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                      <span className="block h-2 w-2" />
                    </div>
                    <span>Real-time alignment guides and torque indicators</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
