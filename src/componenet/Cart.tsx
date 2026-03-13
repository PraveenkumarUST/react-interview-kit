import { useState } from "react"
import type { Item } from "../types/Item"
import { addItem, updateQuantity, removeItem, calculateTotal } from "../Utils/cartUtils"

const sampleItems = [
  { id: 1, name: "Apple", price: 2 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Orange", price: 3 }
]

export default function Cart() {

  const [cart, setCart] = useState<Item[]>([])

  const handleAdd = (item: any) => {
    setCart(prev => addItem(prev, item))
  }

  const increase = (id: number) => {
    setCart(prev => updateQuantity(prev, id, 1))
  }

  const decrease = (id: number) => {
    setCart(prev => updateQuantity(prev, id, -1))
  }

  const remove = (id: number) => {
    setCart(prev => removeItem(prev, id))
  }

  return (
    <div className="cart_section_outer_wrap">
        <div className="cart_left_wrap">
            <h2>Products</h2>
            <div className="items_outer_wrap">
                {sampleItems.map(item => (
                    <div className="item_inner_wrap" key={item.id}>
                    {item.name} - ${item.price}
                    <button onClick={() => handleAdd(item)}>Add</button>
                    </div>
                ))}
            </div>
        </div>
        {cart.length > 0 && (
            <div className="cart_right_wrap">
                <h2>Cart</h2>

                <div className="cart_outer_wrap">
                {cart.map(item => (
                    <div className="cart_inner_wrap" key={item.id}>
                    <h4>{item.name} - ${item.price}</h4>

                    <button onClick={() => decrease(item.id)}>-</button>

                    <h6>{item.quantity}</h6>

                    <button onClick={() => increase(item.id)}>+</button>

                    <button onClick={() => remove(item.id)}>Remove</button>
                    </div>
                ))}
                </div>
            </div>
        )}
      <h3 className="total_count_wrap">Total: ${calculateTotal(cart)}</h3>

    </div>
  )
}