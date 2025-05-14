export interface MotorData {
  timestamp: string
  motorSpeed: number
  torque: number
  motorTemperature: number
  batteryVoltage: number
  batteryCurrent: number
  powerOutput: string
  stateOfCharge: number
  stateOfHealth: number
  phaseCurrentI1: number
  phaseCurrentI2: number
  phaseCurrentI3: number
  phaseVoltageV1: number
  phaseVoltageV2: number
  phaseVoltageV3: number
  powerFactor: number
  currentImbalance: number
  voltageImbalance: number
  harmonicDistortion: number
  motorVibration: number
  motorNoiseLevel: number
  rotorSpeedDeviation: number
  rotorPosition: number
  bearingTemperature: number
  lubricationStatus: string
  motorSurfaceTemperature: number
  coolantFlowRate: number
  airflowRate: number
  thermalResistance: number
  overloadDuration: string
  faultCode: string
  anomalyScore: number
  predictiveFailureTime: number
  degradationRate: number
  maintenanceLogs: string
  lifetimeUsageHours: number
  ambientTemperature: number
  humidityLevel: number
  roadCondition: string
  drivingMode: string
  loadWeight: number
  faultType: string
  severityLevel: string
}

export interface MotorAssemblyStep {
  id: number
  title: string
  description: string
  imageUrl: string
  arModel: string
  requiredTools: string[]
  safetyNotes: string
  estimatedTime: string
}
