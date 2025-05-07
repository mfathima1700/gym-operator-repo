import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { FoodTable } from "@/components/tracker/FoodTable"

const mockData = [
  {
    name: "Banana",
    calories: 89,
    serving_size_g: 100,
    fat_total_g: 0.3,
    fat_saturated_g: 0.1,
    protein_g: 1.1,
    sodium_mg: 1,
    potassium_mg: 358,
    cholesterol_mg: 0,
    carbohydrates_total_g: 23,
    fiber_g: 2.6,
    sugar_g: 12,
  },
  {
    name: "Apple",
    calories: 52,
    serving_size_g: 100,
    fat_total_g: 0.2,
    fat_saturated_g: 0,
    protein_g: 0.3,
    sodium_mg: 1,
    potassium_mg: 107,
    cholesterol_mg: 0,
    carbohydrates_total_g: 14,
    fiber_g: 2.4,
    sugar_g: 10,
  },
]

describe("FoodTable", () => {
  test("renders table headers correctly", () => {
    render(<FoodTable nutritionData={mockData} />)

    expect(screen.getByText("Food Item")).toBeInTheDocument()
    expect(screen.getByText("Total Fat (g)")).toBeInTheDocument()
    expect(screen.getByText("Carbs (g)")).toBeInTheDocument()
    expect(screen.getByText("Fibre (g)")).toBeInTheDocument()
    expect(screen.getByText("Potassium (mg)")).toBeInTheDocument()
    expect(screen.getByText("Sugar (g)")).toBeInTheDocument()
    expect(screen.getByText("Sodium (mg)")).toBeInTheDocument()
  })

  test("renders nutrition data rows", () => {
    render(<FoodTable nutritionData={mockData} />)

    expect(screen.getByText("Banana")).toBeInTheDocument()
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("23")).toBeInTheDocument()
    expect(screen.getByText("2.6")).toBeInTheDocument()
  })

  test("filters rows based on input", () => {
    render(<FoodTable nutritionData={mockData} />)

    const input = screen.getByPlaceholderText("Filter food items...")
    fireEvent.change(input, { target: { value: "banana" } })

    expect(screen.getByText("Banana")).toBeInTheDocument()
    expect(screen.queryByText("Apple")).not.toBeInTheDocument()
  })

  test("shows empty message when no data", () => {
    render(<FoodTable nutritionData={[]} />)
    expect(screen.getByText("No nutrition data available.")).toBeInTheDocument()
  })
})
