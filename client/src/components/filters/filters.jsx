import React from 'react'

import filters from "../../files/filters.json"

import Filter from "./filter.jsx"

import "../../style/home/filters.css"
import "../../style/home/mobile/filters.css"

function Filters({device_type, active_filters, setFiltersFunction, removeFilterFunction, resetFiltersFunction}) {
	let SESSION_checked_checkboxes = JSON.parse(window.sessionStorage.getItem('checked_checkboxes'));

	if (SESSION_checked_checkboxes === null) SESSION_checked_checkboxes = [];

	const [checked_checkboxes, setCheckedCheckboxes] = React.useState(SESSION_checked_checkboxes);

	React.useEffect(() => {
		window.sessionStorage.setItem('checked_checkboxes', JSON.stringify(checked_checkboxes));
	}, [checked_checkboxes]);



	let SESSION_filter_titles = JSON.parse(window.sessionStorage.getItem('filter_titles'));

	if (SESSION_filter_titles === null) SESSION_filter_titles = [];

	const [active_filter_titles, setActiveFilterTitles] = React.useState(SESSION_filter_titles);

	React.useEffect(() => {
		window.sessionStorage.setItem('filter_titles', JSON.stringify(active_filter_titles));
	}, [active_filter_titles]);



	let SESSION_filters_active = JSON.parse(window.sessionStorage.getItem('filters_active'));

	if (SESSION_filters_active === null) SESSION_filters_active = false;

	const [are_filters_active, setFiltersActive] = React.useState(SESSION_filters_active);

	React.useEffect(() => {
		window.sessionStorage.setItem('filters_active', JSON.stringify(are_filters_active));
	}, [are_filters_active]);



	function toggleFilters(event) {
		const container = document.querySelector("div#container");
		container.classList.toggle("active");

		if (container.classList.contains("active")) {
			setFiltersActive(true);
		} else {
			setFiltersActive(false);
		}
	}

	function toggleFiltersList(event) {
		event.currentTarget.classList.toggle("active");

		if (event.currentTarget.classList.contains("active")) {
			setActiveFilterTitles([...active_filter_titles, event.currentTarget.id]);
			
		} else {
			let filtered_titles = active_filter_titles.reduce((matched_checkboxes, current_checkbox_id) => {
				if (current_checkbox_id !== event.currentTarget.id) {
					matched_checkboxes.push(current_checkbox_id);
				}
				return matched_checkboxes;
			}, []);

			setActiveFilterTitles(filtered_titles);
		}
	}


	

	function saveCheckboxInSession(checkbox_id) {
		setCheckedCheckboxes([...checked_checkboxes, checkbox_id]);
	}

	function removeCheckboxFromSession(checkbox_id) {
		let filtered_checkboxes = checked_checkboxes.reduce((matched_checkboxes, current_checkbox_id) => {
			if (current_checkbox_id !== checkbox_id) {
				matched_checkboxes.push(current_checkbox_id);
			}
			return matched_checkboxes;
		}, []);

		setCheckedCheckboxes(filtered_checkboxes);
	}

	function tickCheckboxes() {
		// untick checked checkboxes before searching for ones that need to be ticked
		untickCheckedCheckboxes();

		const filter_checkboxes = document.querySelectorAll("input[type='checkbox']");

		for (let checked_checkbox_id of checked_checkboxes) {
			for (let filter_checkbox of filter_checkboxes) {
				if (filter_checkbox.id === checked_checkbox_id) filter_checkbox.checked = true;
			}
		}
	}

	function untickCheckedCheckboxes() {
		const checked_filter_checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

		for (let checked_filter_checkbox of checked_filter_checkboxes) {
			checked_filter_checkbox.checked = false;
		}
	}

	function showFiltersList() {
		const stored_titles = JSON.parse(window.sessionStorage.getItem('filter_titles'));
		const filter_titles = document.querySelectorAll('h3.filters_title');

		for (let filter_title of filter_titles) {
			for (let stored_title of stored_titles) {
				if (filter_title.id === stored_title) { 
					filter_title.classList.add("active");
				}
			}
		}
	}


	function onChangeHandler(checkbox, value) {
		if (checkbox.checked) {
			setFiltersFunction(value);

			saveCheckboxInSession(checkbox.id);
		} else {
			removeFilterFunction(value);

			removeCheckboxFromSession(checkbox.id);
		}
	}

	function onFiltersResetHandler() {
		const filter_checkboxes = document.querySelectorAll("input[type='checkbox']");

		for (let i = 0; i < filter_checkboxes.length; i++) {
			filter_checkboxes[i].checked = false;
		}

		setCheckedCheckboxes([]);
		window.sessionStorage.setItem('checkboxes', JSON.stringify([]));

		resetFiltersFunction();
	}


	function onActiveFilterClickHandler(filter) {
		const exception_filters = ["FPS", "MMORPG", "RPG"];

		let active_filter = filter;


		for (let exception_filter of exception_filters) {
			if (active_filter === exception_filter) {

				let checkbox = document.querySelector(`input[value='${active_filter}']`);
				checkbox.checked = false;

				removeFilterFunction(active_filter.toLowerCase());
				removeCheckboxFromSession(checkbox.id);

				return;
			}
		}


		if (active_filter === "PVP" || active_filter === "PVE") {
			active_filter = active_filter.replace("V", "v");
				
			let checkbox = document.querySelector(`input[value='${active_filter}']`);
			checkbox.checked = false;

			removeFilterFunction(active_filter.toLowerCase());
			removeCheckboxFromSession(checkbox.id);

			return;
		}


		active_filter = active_filter.split(" ");

		let temp_string = "";

		for (let word of active_filter) {
			temp_string += word.charAt(0) + word.slice(1).toLowerCase() + ",";
		}

		temp_string = temp_string.substring(0, temp_string.length - 1);
		
		active_filter = temp_string.replace(",", " ");

		let checkbox = document.querySelector(`input[value='${active_filter}']`);
		checkbox.checked = false;

		removeFilterFunction(active_filter.toLowerCase());
		removeCheckboxFromSession(checkbox.id);
	}




	window.addEventListener('popstate', showFiltersList);

	window.addEventListener('popstate', tickCheckboxes);

	// call both functions on component load
	React.useEffect(() => {
		showFiltersList();
		tickCheckboxes();
	}, [])


	return(
		<div id="filters">
			{ device_type === "mobile" && 
				<>
					<button type="button" className="filters_toggler" onClick={toggleFilters} >Filters</button>
					<hr />
				</>
			}
			{ device_type === "desktop" && <h2>Filters</h2> }
			{ active_filters.length > 0 && 
				<div id="active_filters">
					{ active_filters.map((active_filter, index) => {
						return <span key={index} className="active_filter" onClick={() => { onActiveFilterClickHandler(active_filter.toUpperCase()) } }>{active_filter.toUpperCase()}
									<span>X</span>
							   </span>
					  }) 
					}
				</div>
			}
			<div id="container" className={are_filters_active ? "active" : ""}>
				<form id="filters_form">
					<div className="filters_container">
						<h3 onClick={toggleFiltersList} className="filters_title" id="genre" >Genre</h3>
						<div>
							{Object.values(filters[0].genre).map((tag, index) => <Filter key={index + 1} filter={tag} onChangeHandler={onChangeHandler} /> )}
						</div>
					</div>
					<div className="filters_container">
						<h3 onClick={toggleFiltersList} className="filters_title" id="player_count" >Player count</h3>
						<div>
							{Object.values(filters[0].player_count).map((tag, index) => <Filter key={index + 1} filter={tag} onChangeHandler={onChangeHandler} /> )}
						</div>
					</div>
					<div className="filters_container">
						<h3 onClick={toggleFiltersList} className="filters_title" id="format" >Format</h3>
						<div>
							{Object.values(filters[0].format).map((tag, index) => <Filter key={index + 1} filter={tag} onChangeHandler={onChangeHandler} /> )}
						</div>
					</div>
					<div className="filters_container">
						<h3 onClick={toggleFiltersList} className="filters_title" id="setting" >Setting</h3>
						<div>
							{Object.values(filters[0].setting).map((tag, index) => <Filter key={index + 1} filter={tag} onChangeHandler={onChangeHandler} /> )}
						</div>
					</div>
					<div className="filters_container">
						<h3 onClick={toggleFiltersList} className="filters_title" id="misc" >Miscellaneous</h3>
						<div>
							{Object.values(filters[0].misc_tags).map((tag, index) => <Filter key={index + 1} filter={tag} onChangeHandler={onChangeHandler} /> )}
						</div>
					</div>
				</form>
				
				<div id="reset_filters_container">
					<button type="button" onClick={onFiltersResetHandler}>Reset filters</button>
				</div>
			</div>
		</div>
	)
}

export default Filters;