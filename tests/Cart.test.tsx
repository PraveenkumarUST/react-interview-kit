import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Cart from "../src/component/Cart"

describe("Cart Component", () => {

  it("renders product list", () => {
    render(<Cart />)

    expect(screen.getByText("Apple - $2")).toBeInTheDocument()
    expect(screen.getByText("Banana - $1")).toBeInTheDocument()
    expect(screen.getByText("Orange - $3")).toBeInTheDocument()
  })


  it("adds item to cart when clicking Add", () => {
    render(<Cart />)

    const addButtons = screen.getAllByText("Add")

    fireEvent.click(addButtons[0])

    expect(screen.getByText("Cart")).toBeInTheDocument()
    expect(screen.getByText("Remove")).toBeInTheDocument()
  })


  it("increments quantity when + is clicked", () => {
    render(<Cart />)

    fireEvent.click(screen.getAllByText("Add")[0])

    const plusButton = screen.getByText("+")
    fireEvent.click(plusButton)

    expect(screen.getByText("2")).toBeInTheDocument()
  })


  it("decrements quantity when - is clicked", () => {
    render(<Cart />)

    fireEvent.click(screen.getAllByText("Add")[0])

    fireEvent.click(screen.getByText("+"))

    fireEvent.click(screen.getByText("-"))

    expect(screen.getByText("1")).toBeInTheDocument()
  })


  it("removes item when Remove button is clicked", () => {
    render(<Cart />)

    fireEvent.click(screen.getAllByText("Add")[0])

    fireEvent.click(screen.getByText("Remove"))

    expect(screen.queryByText("Cart")).not.toBeInTheDocument()
  })


  it("updates total price correctly", () => {
    render(<Cart />)

    fireEvent.click(screen.getAllByText("Add")[0])

    expect(screen.getByText("Total: $2")).toBeInTheDocument()
  })

})