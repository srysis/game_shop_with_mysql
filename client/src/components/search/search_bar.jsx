import React from 'react';
import axios from 'axios';


function SearchBar({setSearchQueue, setSearchingOverlayFunction, setFoundGamesList}) {
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	function handleSearch(event) {
		setSearchQueue(event.target.value.toLowerCase());
		
		if (event.target.value !== "") {
			axios.post(`${API_BASE_URL}/games/search`, event.target.value.toLowerCase())
			.then(response => setFoundGamesList(response.data))
			.catch(error => console.error(error))
		} else {
			setFoundGamesList([]);
		}
	}

	return (
		<input 
			type="search" 
			placeholder="Looking for a specific game?" 
			id="search_bar"
			onChange={(event) => {handleSearch(event)}}
			onFocus={() => setSearchingOverlayFunction(true)}
		/>
	)
}

export default SearchBar;