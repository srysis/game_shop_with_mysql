import React from "react"
import { Link } from "react-router";

function SearchResult({
	  game: {id, box_art, name, price}, 
	  setSearchingOverlayFunction
	}) {

	const PATH_TO_BOX_ART = '/media/images/box_art/';

	return (
		<div className="search_result">
			<div className="link_container">
				<div className="overlay">
					<Link to={`/games/${id}`} className="details" onClick={() => { setSearchingOverlayFunction(false); } }  />
				</div>
				<div className="box_art">
					<img src={PATH_TO_BOX_ART + box_art} alt={`${name} box art`} />
				</div>
				<div className="title">
					<h2>{name}</h2>
					<span className="price"><p>${price}.00</p></span>
				</div>
			</div>
		</div>
	);
}

export default SearchResult;
