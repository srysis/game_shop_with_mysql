import React from "react"
import { Link } from "react-router";

import CartOverlayItem from "./cart_overlay_item.jsx"

import "../../style/cart/cart_overlay.css"
import "../../style/cart/mobile/cart_overlay.css"

function CartOverlay( {cart_content, setCartActive} ) {

	if (cart_content.length > 0) {
		return (
			<div id="cart_overlay_container">
				<h1>Your cart</h1>
				<div id="cart_overlay_content">
					{cart_content.map((item, index) => <CartOverlayItem key={item.id} item={item} setCartActive={setCartActive} />)}
				</div>
				<div id="go_to_cart"><Link to="/cart" onClick={() => setCartActive(false)}>Manage cart</Link></div>
			</div>
		);
	} else {
		return (
			<div id="cart_overlay_container">
				<h1 className="empty_cart">Your cart is currently empty.</h1>
			</div>
		);
	}
}

export default CartOverlay;
