import React from 'react'

import GameGrid from "./game_grid.jsx"
import GameList from "./game_list.jsx"

import grid_icon from "../../files/grid-view.png"
import list_icon from "../../files/list-view.png"

import "../../style/home/catalog.css"
import "../../style/home/mobile/catalog.css"

function Catalog({games_list, filters}) {
	let scroll_positions = JSON.parse(window.sessionStorage.getItem('scroll_positions'));

	if (scroll_positions === null) scroll_positions = [];

	
	window.addEventListener('popstate', () => {
		window.scrollTo(0, 0);
	});


	let SESSION_catalog_size = JSON.parse(window.sessionStorage.getItem('catalog_size'));

	// initialize 'catalog_size' if session key has not been created yet
	if (SESSION_catalog_size === null) SESSION_catalog_size = 6;

	const [catalog_size, setCatalogSize] = React.useState(SESSION_catalog_size);



	let SESSION_view_mode = JSON.parse(window.sessionStorage.getItem('view_mode'));

	// specify default view mode if session key has not been created yet
	if (SESSION_view_mode === null) SESSION_view_mode = "list";

	const [view_mode, setViewMode] = React.useState(SESSION_view_mode);

	window.addEventListener('load', () => {
		// check the view mode and mark corresponding button as 'pressed'
		if (view_mode === "list") document.querySelector('button.list').classList.add("pressed");
		if (view_mode === "grid") document.querySelector('button.grid').classList.add("pressed");
	})


	const [has_reached_end, setHasReachedEnd] = React.useState(false);

	React.useEffect(() => {
		if (catalog_size >= games_list.length) setHasReachedEnd(true);
	}, []);



	// used as a limit for the 'for' loop
	let filters_size = filters.length;

	// 'filtered_games' is a temporary array, used in the 'for' loop
	let filtered_games = [];


	let TEMP_final_games = [];
	let final_games = [];

	
	// if no filters were passed, assign global 'products' JSON data to the 'final_games_list'
	// but if there are filters being passed back to this component, do the code in the 'else' block
	// NOTE: it is probably not the most efficient way to handle such things, but it will pass for now
	if (filters_size === 0) {
		final_games = games_list.slice(0, catalog_size);
	} else {

		// in this loop we will iterate through every filter that were passed to this component
		for (let index = 0; index < filters_size; index++) {

			// 'filtered_games' will store games that satisfy the filter the loop is currently on
			// e.g. if the loop is currently on 'action' filter, it will store every game with the 'action' tag in it
			filtered_games = games_list.filter((game) => {
				// split 'tags_list' string into an array of strings seperated by coma
				let tags = game.tags_list.split(",");

				for (let tag of Object.values(tags)) {
					if (tag.toLowerCase() === filters[index]) return true;
				}
			})

			// after 'filtered_games' has been assigned, we add it's elements to the temporary array
			// in the last iteration, all games that satisfy each filter individually will be stored here
			// e.g. if one game has 'stealth' and the other one has 'shooter' tag in them, they both will be stored
			TEMP_final_games = TEMP_final_games.concat(filtered_games);
		}

		//	due to how 'filter' feature was implemented, duplicates will appear in final array
		// 'Sets' eliminate this issue because they do not allow more than one entry of any value, making it perfect for 'filter' feature
		final_games = [...(new Set(TEMP_final_games))];
	}


	function onViewSwitchClickHandler(event) {
		if (event.currentTarget.classList.contains("grid")) {
			setViewMode("grid");

			document.querySelector("div#list_view > button").classList.remove("pressed");
			event.currentTarget.classList.add("pressed");

			window.sessionStorage.setItem('view_mode', JSON.stringify("grid"));
		} else if (event.currentTarget.classList.contains("list")) {
			setViewMode("list");

			document.querySelector("div#grid_view > button").classList.remove("pressed");
			event.currentTarget.classList.add("pressed");

			window.sessionStorage.setItem('view_mode', JSON.stringify("list"));
		}
	}


	function onGameClickHandler(event) {
		// store scroll position BEFORE scrolling to the top
		scroll_positions.push(window.scrollY);
		window.sessionStorage.setItem('scroll_positions', JSON.stringify(scroll_positions));

		window.scrollTo(0, 0);

		window.sessionStorage.setItem('catalog_size', JSON.stringify(catalog_size));
	}

	function increaseCatalogSize() {
		let start_catalog_size = catalog_size;

		let new_catalog_size = start_catalog_size + 4;

		if (new_catalog_size >= games_list.length) {
			setHasReachedEnd(true);
			new_catalog_size = games_list.length; 
		}

		setCatalogSize(new_catalog_size);
	}

	// function that checks if given element is in the user's browser's viewport by X percent, where X is from 0 to 100
	function isVisibleInViewport(element, percentage) {
		let rect = element.getBoundingClientRect();
		let windowHeight = (window.innerHeight || document.documentElement.clientHeight);

		return !(
			Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentage ||
			Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentage
		)
	};

	function loadMoreProducts() {
		const button = document.querySelector("button#load_more");

		if (button != null) {
			if (isVisibleInViewport(button, 100)) {
				button.click();
			}
		}
	}

	React.useEffect(() => {
		if (!has_reached_end) window.addEventListener("scroll", loadMoreProducts);
		if (has_reached_end) window.removeEventListener("scroll", loadMoreProducts);
	}, [has_reached_end])


	window.addEventListener('beforeunload', onBeforeUnloadHandler)


	function onBeforeUnloadHandler() {
		window.sessionStorage.setItem('catalog_size', JSON.stringify(6));
		window.sessionStorage.setItem('scroll_positions', JSON.stringify([]));
	}

	return (
		<div id="catalog">
			<div id="view_container">
				<div id="view">
					<div id="grid_view">
						<button type="button" className={view_mode === "grid" ? "grid pressed" : "grid"} onClick={onViewSwitchClickHandler}>
							<img src={grid_icon} alt=""/>
						</button>
					</div>
					<div id="list_view">
						<button type="button" className={view_mode === "list" ? "list pressed" : "list"} onClick={onViewSwitchClickHandler} >
							<img src={list_icon} alt=""/>
						</button>
					</div>
				</div>
			</div>
			{view_mode === "grid" && 
				<div id="games" className="grid" >
					{final_games.map((game) => <GameGrid key={game.id} game={game} onClickHandler={onGameClickHandler} />)}
				</div>
			}
			{view_mode === "list" && 
				<div id="games" className="list" >
					{final_games.map((game) => <GameList key={game.id} game={game} onClickHandler={onGameClickHandler} />)}
				</div>
			}
			{(!has_reached_end && filters_size === 0) && <button type="button" id="load_more" onClick={() => { increaseCatalogSize() } } >Load more</button> }
		</div>
	)
}

export default Catalog;