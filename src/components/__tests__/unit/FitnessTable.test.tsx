import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import { FitnessTable } from "@/components/tracker/FitnessTable"
import { ExerciseData } from "@/components/tracker/FitnessTable"

const mockData: ExerciseData[] = [
  {
    name: "running",
    calories_per_hour: 600,
    duration_minutes: 30,
    total_calories: 300,
  },
  {
    name: "cycling",
    calories_per_hour: 500,
    duration_minutes: 45,
    total_calories: 375,
  },
]

describe("FitnessTable", () => {
  it("renders the table with data", () => {
    render(<FitnessTable exerciseData={mockData} />)

    // Header checks
    expect(screen.getByText("Activity")).toBeInTheDocument()
    expect(screen.getByText("Calories/Hour")).toBeInTheDocument()
    expect(screen.getByText("Duration (mins)")).toBeInTheDocument()
    expect(screen.getByText("Total Calories")).toBeInTheDocument()

    // Data rows
    expect(screen.getByText("running")).toBeInTheDocument()
    expect(screen.getByText("cycling")).toBeInTheDocument()
    expect(screen.getByText("600")).toBeInTheDocument()
    expect(screen.getByText("500")).toBeInTheDocument()
  })

  it("filters table by input", () => {
    render(<FitnessTable exerciseData={mockData} />)

    const input = screen.getByPlaceholderText("Filter activities...")

    fireEvent.change(input, { target: { value: "running" } })

    expect(screen.getByText("running")).toBeInTheDocument()
    expect(screen.queryByText("cycling")).not.toBeInTheDocument()
  })

  it("shows 'No results.' if no match found", () => {
    render(<FitnessTable exerciseData={mockData} />)

    const input = screen.getByPlaceholderText("Filter activities...")

    fireEvent.change(input, { target: { value: "yoga" } })

    expect(screen.getByText("No results.")).toBeInTheDocument()
  })
})
