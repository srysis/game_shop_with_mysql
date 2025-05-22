import React from "react"

import { Outlet } from 'react-router-dom'

import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import SuccessMessage from "./SuccessMessage.jsx"


function Layout( {device_type, cart_content, was_added, was_removed, was_cleared, resetMessages, setSearchQueueState, setFoundGamesListState} ) {
	let message_type = "";

	if (was_added) { 
		message_type = "add";
	} else if (was_removed) { 
		message_type = "remove";
	} else if (was_cleared) {
		message_type = "clear";
	}

	return (
		<>
			{ was_added && <SuccessMessage type={message_type} onClickHandler={resetMessages} /> }
			{ was_removed && <SuccessMessage type={message_type} onClickHandler={resetMessages} /> }
			{ was_cleared && <SuccessMessage type={message_type} onClickHandler={resetMessages} /> }
			<Header device_type={device_type} cart_content={cart_content} setSearchQueueState={setSearchQueueState} setFoundGamesListState={setFoundGamesListState} />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default Layout;
