import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would fetch data from the sample.csv file
  // For demo purposes, generate simulated motor data

  const sampleData = Array.from({ length: 24 }, (_, i) => {
    const baseTemp = 85 + Math.random() * 20
    const timestamp = new Date()
    timestamp.setMinutes(timestamp.getMinutes() - (24 - i) * 5)

    return {
      Timestamp: `${timestamp.getHours().toString().padStart(2, "0")}:${timestamp.getMinutes().toString().padStart(2, "0")}`,
      "Motor Speed (RPM)": 2000 + Math.random() * 400,
      "Torque (Nm)": 380 + Math.random() * 40,
      "Motor Temperature (°C)": baseTemp + Math.random() * 10,
      "Battery Voltage (V)": 600 + Math.random() * 20,
      "Battery Current (A)": 140 + Math.random() * 20,
      "Power Output (W)": "90000",
      "State of Charge (SOC) (%)": 30 + Math.random() * 10,
      "State of Health (SOH) (%)": 90 + Math.random() * 5,
      "Phase Current I1 (A)": 4 + Math.random() * 1,
      "Phase Current I2 (A)": 290 + Math.random() * 20,
      "Phase Current I3 (A)": 135 + Math.random() * 15,
      "Phase Voltage V1 (V)": 440 + Math.random() * 20,
      "Phase Voltage V2 (V)": 275 + Math.random() * 15,
      "Phase Voltage V3 (V)": 195 + Math.random() * 15,
      "Power Factor": 0.7 + Math.random() * 0.1,
      "Current Imbalance (%)": 3 + Math.random() * 1,
      "Voltage Imbalance (%)": 2 + Math.random() * 1,
      "Harmonic Distortion (%)": 8 + Math.random() * 2,
      "Motor Vibration (mm/s²)": i > 18 ? 4 + Math.random() * 1 : 2 + Math.random() * 1,
      "Motor Noise Level (dB)": 65 + Math.random() * 10,
      "Rotor Speed Deviation (%)": -1 + Math.random() * 2,
      "Rotor Position (°)": Math.random() * 360,
      "Bearing Temperature (°C)": baseTemp * 0.6,
      "Lubrication Status": "Dry",
      "Motor Surface Temperature (°C)": baseTemp * 0.7,
      "Coolant Flow Rate (L/min)": 1.2 + Math.random() * 0.3,
      "Airflow Rate (m³/min)": 140 + Math.random() * 20,
      "Thermal Resistance (°C/W)": 0.2 + Math.random() * 0.1,
      "Overload Duration (s)": "290",
      "Fault Code": i > 18 ? "P0AC3" : "P0000",
      "Anomaly Score": i > 18 ? 0.4 + Math.random() * 0.1 : 0.2 + Math.random() * 0.1,
      "Predictive Failure Time (hours)": 4500 - i * 10,
      "Degradation Rate (%/hour)": 0.3 + Math.random() * 0.2,
      "Maintenance Logs": "Routine Check",
      "Lifetime Usage Hours": 14400,
      "Ambient Temperature (°C)": 10 + Math.random() * 5,
      "Humidity Level (%)": 65 + Math.random() * 15,
      "Road Condition": "Wet",
      "Driving Mode": "Sport",
      "Load Weight (Kg)": 1450 + Math.random() * 50,
      "Fault Type": i > 18 ? "Overheat" : "None",
      "Severity Level": i > 18 ? "Warning" : "Normal",
    }
  })

  return NextResponse.json(sampleData)
}
