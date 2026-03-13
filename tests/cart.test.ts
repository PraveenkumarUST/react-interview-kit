import { describe, it, expect } from "vitest"
import { addItem, updateQuantity, removeItem, calculateTotal } from "../src/Utils/cartUtils"

const item = { id: 1, name: "Apple", price: 2, quantity: 1 }

describe("Cart Logic", () => {

  it("adds item to cart when cart is empty", () => {
    const cart = addItem([], item)

    expect(cart.length).toBe(1)
    expect(cart[0].name).toBe("Apple")
    expect(cart[0].quantity).toBe(1)
  })


  it("increments quantity if item already exists", () => {
    const cart = addItem([item], item)

    expect(cart.length).toBe(1)
    expect(cart[0].quantity).toBe(2)
  })


  it("updates quantity when incrementing", () => {
    const cart = updateQuantity([item], 1, 1)

    expect(cart[0].quantity).toBe(2)
  })


  it("decreases quantity when decrementing", () => {
    const cart = updateQuantity([{ ...item, quantity: 2 }], 1, -1)

    expect(cart[0].quantity).toBe(1)
  })


  it("removes item automatically when quantity becomes zero", () => {
    const cart = updateQuantity([item], 1, -1)

    expect(cart.length).toBe(0)
  })


  it("removes item using removeItem function", () => {
    const cart = removeItem([item], 1)

    expect(cart.length).toBe(0)
  })


  it("calculates total price for single item", () => {
    const cart = [{ ...item, quantity: 2 }]

    const total = calculateTotal(cart)

    expect(total).toBe(4)
  })


  it("calculates total price for multiple items", () => {

    const cart = [
      { id: 1, name: "Apple", price: 2, quantity: 2 },
      { id: 2, name: "Banana", price: 1, quantity: 3 }
    ]

    const total = calculateTotal(cart)

    expect(total).toBe(7)
  })

})