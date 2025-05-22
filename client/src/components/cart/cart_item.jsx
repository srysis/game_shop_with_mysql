import React from "react"
import { Link } from "react-router";

import remove_icon from "../../files/cross.svg"

function CartItem({
	  game: {id, box_art, name, price}, 
	  onRemove
	}) {
	return (
		<div className="cart_item">
			<div className="link_container">
				<div className="overlay">
					<Link to={`/games/${id}`} />
				</div>
				<div className="box_art">
					<img src={`media/images/box_art/${box_art}`} alt={`${name} box art`} />
				</div>
				<div className="cart_item_info">
					<h2><Link to={`/product/${id}`}>{name}</Link></h2>
					<p>${price}.00</p>
				</div>
				<div className="remove_from_cart_container">
					<button type="button" className="remove_from_cart" onClick={ () => { onRemove(id) } }><img src={remove_icon} /></button>
				</div>
			</div>
		</div>
	)
}

export default CartItem;
