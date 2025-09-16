import React from "react"

import axios from 'axios'

import useTitle from "../hooks/useTitle.jsx"

import CartItem from "../components/cart/cart_item.jsx"

import "../style/cart/cart.css"
import "../style/cart/mobile/cart.css"

function Cart( {cart_content, onRemove, onCartClear} ) {
	useTitle("Cart on Games Shop");

	if (cart_content.length > 0) {
		let total_price = 0;

		for (let item of cart_content) {
			total_price += item.price;
		}

		return (
			<div id="cart">
				<div id="title"><h1>Your cart:</h1></div>
				{cart_content.map((item) => {
					return <CartItem key={item.id} game={item} onRemove={onRemove} />
				})}
				<hr />
				<div className="flex_container">
					<div id="clear_cart_container">
						<button type="button" onClick={onCartClear}>Clear cart</button>
					</div>
					<div id="total_price">
						<div id="text"><h2>Total price:</h2></div>
						<div id="price"><p>${total_price}.00</p></div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div id="cart">
				<h1>Your cart is currently empty.</h1>
			</div>
		)
	}

	
}

export default Cart;
