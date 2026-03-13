import { describe, it, expect } from "vitest"
import { addItem, updateQuantity, removeItem, calculateTotal } from "../src/Utils/cartUtils"

const item = { id: 1, name: "Apple", price: 2, quantity: 1 }

describe("Cart Logic", () => {

  it("adds item to empty cart", () => {
    const cart = addItem([], item)
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(1)
  })

  it("increments quantity if item already exists", () => {
    const cart = addItem([item], item)
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(2)
  })

  it("updates quantity when incrementing", () => {
    const cart = updateQuantity([item], 1, 1)
    expect(cart[0].quantity).toBe(2)
  })

  it("decreases quantity correctly", () => {
    const cart = updateQuantity([{ ...item, quantity: 2 }], 1, -1)
    expect(cart[0].quantity).toBe(1)
  })

  it("removes item when quantity becomes zero", () => {
    const cart = updateQuantity([item], 1, -1)
    expect(cart).toHaveLength(0)
  })

  it("removes item using removeItem", () => {
    const cart = removeItem([item], 1)
    expect(cart).toHaveLength(0)
  })

  it("calculates total for single item", () => {
    const cart = [{ ...item, quantity: 2 }]
    const total = calculateTotal(cart)
    expect(total).toBe(4)
  })

  it("calculates total for multiple items", () => {
    const cart = [
      { id: 1, name: "Apple", price: 2, quantity: 2 },
      { id: 2, name: "Banana", price: 1, quantity: 3 }
    ]

    const total = calculateTotal(cart)
    expect(total).toBe(7)
  })

  it("returns same cart if updateQuantity id not found", () => {
    const cart = updateQuantity([item], 99, 1)

    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(1)
  })


  it("returns 0 total when cart is empty", () => {
    const total = calculateTotal([])

    expect(total).toBe(0)
  })

  it("does not change other items when updating quantity", () => {
    const cart = [
      { id: 1, name: "Apple", price: 2, quantity: 1 },
      { id: 2, name: "Banana", price: 1, quantity: 1 }
    ]

    const updated = updateQuantity(cart, 1, 1)

    expect(updated[0].quantity).toBe(2)
    expect(updated[1].quantity).toBe(1)

  })

  it("returns empty cart when updating empty cart", () => {

    const cart = updateQuantity([], 1, 1)

    expect(cart).toEqual([])

  })

  it("removeItem does nothing if id not found", () => {

    const cart = removeItem([item], 99)

    expect(cart).toHaveLength(1)

  })

  it("increments only the matching item and keeps others unchanged", () => {

  const cart = [
    { id: 1, name: "Apple", price: 2, quantity: 1 },
    { id: 2, name: "Banana", price: 1, quantity: 1 }
  ]

  const updated = addItem(cart, { id: 1, name: "Apple", price: 2, quantity: 1 })

  expect(updated[0].quantity).toBe(2)   // updated item
  expect(updated[1].quantity).toBe(1)   // unchanged item

})


})