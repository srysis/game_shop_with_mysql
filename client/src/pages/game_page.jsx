import React from 'react'
import { useParams } from 'react-router-dom'

import { Markup } from 'interweave'

import axios from 'axios'

import GameScreenshots from "../components/game_page/game_screenshots.jsx"
import ScreenshotOverlay from "../components/game_page/screenshot_overlay.jsx"

import "../style/game/game_page.css"
import "../style/game/mobile/game_page.css"

function GamePage({device_type, addToCartFunction, isDuplicate}) {
	const { id } = useParams();

	const [game_info, setGameInfo] = React.useState([]);
	const [game_info_was_fetched, setWasFetched] = React.useState(false);

	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	React.useEffect(() => {
		axios.get(`${API_BASE_URL}/games/${id}`)
		.then(response => { setGameInfo(response.data); setWasFetched(true); })
		.catch(error => console.error(error));
	}, [id]);

	const game = game_info[0];

	React.useEffect(() => {
		document.title = `Buy ${game?.name} on Game Shop`;
	}, [game])



	let scroll_positions = JSON.parse(window.sessionStorage.getItem('scroll_positions'));

	if (scroll_positions === null) scroll_positions = [];

	window.addEventListener('popstate', onPopStateHandler);

	function onPopStateHandler(event) {
		let last_scroll_position = scroll_positions[scroll_positions.length - 1];
		window.scrollTo(0, last_scroll_position);

		scroll_positions.pop();
		window.sessionStorage.setItem('scroll_positions', JSON.stringify(scroll_positions));
		window.removeEventListener('popstate', onPopStateHandler);
	}


	
	function onAddHandler(item) {
		if (isDuplicate(item)) { 
			return;
		}
		
		addToCartFunction(item);
	}

	const PATH_TO_BOX_ART = '/media/images/box_art/';
	const PATH_TO_SCREENSHOTS = '/media/images/screenshots/';

	const [is_fullscreen, toggleFullscreen] = React.useState(false);
	const [current_image, setCurrentImage] = React.useState();
	const [current_image_index, setCurrentImageIndex] = React.useState(0);

	function setFullscreenState(value) {
		toggleFullscreen(value);

		// hide scrollbar and adjust margin if fullscreen overlay is visible
		if (value) { 
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'hidden';
			document.body.style.marginRight = 0.4 + "%";
		} else { 
			document.body.style.overflowX = 'visible';
			document.body.style.overflowY = 'scroll';
			document.body.style.marginRight = 0;
		}
	}

	function setCurrentImageState(image) {
		setCurrentImage(image);
	}

	function setCurrentImageIndexState(index) {
		setCurrentImageIndex(index);
	}


	if (game_info_was_fetched) {
		const tags = game.tags_list.split(",");
		const screenshots_LD = game.screenshots_LD.split(",");
		const screenshots_HD = game.screenshots_HD.split(",");


		return (
			<div id="game_page" key={game.id}>
				<div className="game_details">
					<div className="box_art">
						<img src={PATH_TO_BOX_ART + game.box_art} alt={`${game.name} box art`} />
					</div>
					<div className="info_and_options">
						<h2>{game.name}</h2>
						<div className="tags_container">{Object.values(tags).map((tag, index) => <span key={index}>{tag}</span>)}</div>
						<p>{game.short_description}</p>
						<div className="buy_container">
							<p className="price">${game.price}</p>
							{ !isDuplicate(game) && <button type="button" className="buy" onClick={ () => { onAddHandler(game); } } >Add to Cart</button> }
							{ isDuplicate(game) && <button type="button" className="is_in_cart" disabled >In the cart</button> }
						</div>
					</div>
				</div>

				<div id="description_wrapper">
					<div className="description_title">
						<h2>About the game:</h2>
						<hr />
						<div className="game_description">
							<Markup content={game.description} />
						</div>
					</div>
				</div>

				<GameScreenshots 
					device_type={device_type}
					image_list={screenshots_LD}
					path_to_screenshots={PATH_TO_SCREENSHOTS}
					toggleFullscreenFunction={setFullscreenState}
					setCurrentImageFunction={setCurrentImageState}
					setCurrentImageIndexFunction={setCurrentImageIndexState}
				/>

				{is_fullscreen && 
					<ScreenshotOverlay 
						device_type={device_type}
						image_list={screenshots_HD} 
						image={current_image} 
						path_to_screenshots={PATH_TO_SCREENSHOTS}
						image_index={current_image_index}
						toggleFullscreenFunction={setFullscreenState} 
					/>
				}
			</div>
		)
	}

	
}

export default GamePage;