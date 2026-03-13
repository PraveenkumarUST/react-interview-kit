import { describe, it, expect } from "vitest"
import { addItem, updateQuantity, removeItem, calculateTotal } from "../src/Utils/cartUtils"

const item = { id: 1, name: "Apple", price: 2, quantity: 1 }

describe("Cart Logic", () => {

  it("adds item to cart", () => {
    const cart = addItem([], item)
    expect(cart.length).toBe(1)
  })

  it("updates quantity", () => {
    const cart = updateQuantity([item], 1, 1)
    expect(cart[0].quantity).toBe(2)
  })

  it("removes item", () => {
    const cart = removeItem([item], 1)
    expect(cart.length).toBe(0)
  })

  it("calculates total price", () => {
    const cart = [{ ...item, quantity: 2 }]
    const total = calculateTotal(cart)
    expect(total).toBe(4)
  })

})