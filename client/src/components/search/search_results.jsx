import React from "react"

import SearchResult from "./search_result.jsx"

import "../../style/search/search_results.css"
import "../../style/search/mobile/search_results.css"

function SearchResults({setSearchingOverlayFunction, search_queue, found_games_list}) {
	
	if (found_games_list.length > 0) {
		return (
			<div id="search_results">
				{found_games_list.slice(0, 4).map((game, index) => <SearchResult key={game.id} game={game} setSearchingOverlayFunction={setSearchingOverlayFunction} />)}
			</div>
		);
	} else {
		return (
			<div id="search_results">
				<h2 id="empty_results">No games that match the given queue were found.</h2>
			</div>
		);
	}
	
}

export default SearchResults;
