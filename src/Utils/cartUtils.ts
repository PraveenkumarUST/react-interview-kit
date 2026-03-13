import type { Item } from "../types/Item"

export function addItem(cart: Item[], item: Item): Item[] {

  const existing = cart.find(i => i.id === item.id)

  if (existing) {
    return cart.map(i =>
      i.id === item.id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    )
  }

  return [...cart, { ...item, quantity: 1 }]
}

export function updateQuantity(cart: Item[], id: number, amount: number): Item[] {

  return cart
    .map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + amount }
        : item
    )
    .filter(item => item.quantity > 0)
}

export function removeItem(cart: Item[], id: number): Item[] {
  return cart.filter(item => item.id !== id)
}

export function calculateTotal(cart: Item[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}