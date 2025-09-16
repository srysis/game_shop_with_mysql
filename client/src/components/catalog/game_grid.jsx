import React from 'react';
import { Link } from "react-router";

function GameGrid({ game: {id, box_art, name, tags_list, price}, onClickHandler }) {
	const tags = tags_list.split(",");

	return(
		<div className="game">
			<div className="link_container">
				<div className="overlay">
					<Link to={`/games/${id}`} className="details" onClick={onClickHandler} />
				</div>
				<div className="box_art">
					<img src={`/media/images/box_art/${box_art}`} alt={`${name} box art`} />
				</div>
				<div className="title">
					<h2>{name}</h2>
				</div>
			</div>
			<div className="info">
				<div className="tags_container">{Object.values(tags).map((tag, index) => <span key={index}>{tag}</span>)}</div>
				<div className="price"><p>${price}</p></div>
			</div>
		</div>
	)
}

export default GameGrid;