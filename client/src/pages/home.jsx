import React from 'react'

import useTitle from "../hooks/useTitle.jsx"

import Filters from "../components/filters/filters.jsx"
import Catalog from "../components/catalog/catalog.jsx"

import "../style/home/home.css"
import "../style/home/mobile/home.css"

function Home({device_type, games_list}) {
	useTitle("Games Shop");

	let SESSION_filters = JSON.parse(window.sessionStorage.getItem('filters'));

	if (SESSION_filters === null) SESSION_filters = [];

	const [filters, setFilters] = React.useState(SESSION_filters);

	React.useEffect(() => {
		window.sessionStorage.setItem('filters', JSON.stringify(filters));
	}, [filters])

	function setFiltersFunction(filter) {
		setFilters([...filters, filter]);
	}

	function removeFilter(filter) {
		const new_filters = filters.filter((item) => item !== filter);

		setFilters(new_filters);
	}

	function resetFilters() {
		setFilters([]);
	}

	return(
		<div id="home">
			<Filters device_type={device_type} active_filters={filters} setFiltersFunction={setFiltersFunction} removeFilterFunction={removeFilter} resetFiltersFunction={resetFilters} />
			<Catalog games_list={games_list} filters={filters} />
		</div>
	)
}

export default Home;