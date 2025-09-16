import React from "react"
import { Link } from "react-router";

function CartOverlayItem({
	  item: {id, box_art, name, price}, 
	  setCartActive
	}) {
	return (
		<div className="cart_overlay_item">
			<div className="link_container">
				<div className="overlay">
					<Link to={`/games/${id}`} onClick={() => { setCartActive(false) }} />
				</div>
				<div className="box_art">
					<img src={`/media/images/box_art/${box_art}`} alt={`${name} box art`} />
				</div>
				<div className="item_info">
					<h2>{name}</h2>
					<span className="price"><p>${price}</p></span>
				</div>
			</div>
		</div>
	)
}

export default CartOverlayItem;
