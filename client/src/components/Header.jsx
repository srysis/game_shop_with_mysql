import React from "react"
import { Link } from "react-router";

import SearchBar from "./search/search_bar.jsx"
import SearchResults from "./search/search_results.jsx"

import CartOverlay from "./cart/cart_overlay.jsx"

import cart_icon from "../files/cart.png"

import "../style/layout/header.css"
import "../style/layout/mobile/header.css"

function Header( {device_type, cart_content, setSearchQueueState, setFoundGamesListState} ) {
	const [is_searching, setSearching] = React.useState(false);
	const [search_queue, setSearchQueue] = React.useState("");
	const [found_games_list, setFoundGamesList] = React.useState([]);

	const [is_cart_active, setCartActive] = React.useState(false);

	function onClickHandler(event) {
		
		// force refresh the page if already on this page
		// also reset all relevant UI data
		if (event.target.href === window.location.href) {
			window.sessionStorage.setItem('scroll_positions', JSON.stringify([]));
			window.sessionStorage.setItem('catalog_size', JSON.stringify(6));
			window.sessionStorage.setItem('checkboxes', JSON.stringify([]));
			window.sessionStorage.setItem('filter_titles', JSON.stringify([]));
			window.sessionStorage.setItem('filters', JSON.stringify([]));

			window.location.reload();
		}
		
	}


	function setSearchQueueWrap(value) {
		setSearchQueue(value);
	}

	function setFoundGamesListWrap(list) {
		setFoundGamesList(list);
	}

	function setSearchingOverlay(value) {
		setSearching(value);

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


	function setCartActiveWrap(value) {
		setCartActive(value);

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

	if (device_type === "desktop") {
		return (
			<header>
				{is_searching &&
					<div id="search_overlay" onClick={() => setSearchingOverlay(false)} ></div>
				}
				{is_cart_active &&
					<div id="cart_overlay" onClick={() => setCartActiveWrap(false)} ></div>
				}
				<div id="logo_container">
					<h1 id="logo"><Link to="/" onClick={onClickHandler} >Game Shop</Link></h1>
				</div>
				<div id="search_container">
					<SearchBar setSearchQueue={setSearchQueueWrap} setSearchingOverlayFunction={setSearchingOverlay} setFoundGamesList={setFoundGamesListWrap} />
					{(is_searching && search_queue !== "") &&
						<SearchResults setSearchingOverlayFunction={setSearchingOverlay} search_queue={search_queue.toLowerCase()} found_games_list={found_games_list} />
					}
				</div>
				<div id="cart_container">
					<button type="button" id="open_cart_overlay" onClick={() => {setCartActiveWrap(true)}}><img src={cart_icon} alt="Go to cart" className="cart_icon" /></button>
					{is_cart_active && <CartOverlay cart_content={cart_content} setCartActive={setCartActiveWrap} />}
				</div>
			</header>
		)
	}
	if (device_type === "mobile") {
		return (
			<header>
				{is_searching &&
					<div id="search_overlay" onClick={() => setSearchingOverlay(false)} ></div>
				}
				{is_cart_active &&
					<div id="cart_overlay" onClick={() => setCartActiveWrap(false)} ></div>
				}
				{is_cart_active && <CartOverlay cart_content={cart_content} setCartActive={setCartActiveWrap} />}
				<div id="logo_container">
					<h1 id="logo"><Link to="/" onClick={onClickHandler} >Game Shop</Link></h1>
				</div>
				<div id="cart_container">
					<button type="button" id="open_cart_overlay" onClick={() => {setCartActiveWrap(true)}}><img src={cart_icon} alt="Go to cart" className="cart_icon" /></button>
				</div>
				<div id="search_container">
					<SearchBar setSearchQueue={setSearchQueueWrap} setSearchingOverlayFunction={setSearchingOverlay} setFoundGamesList={setFoundGamesListWrap} />
					{(is_searching && search_queue !== "") &&
						<SearchResults setSearchingOverlayFunction={setSearchingOverlay} search_queue={search_queue.toLowerCase()} found_games_list={found_games_list} />
					}
				</div>
			</header>
		)	
	}
	
}

export default Header;
