import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import axios from 'axios'

import Layout from "./components/Layout.jsx"

import Home from './pages/home.jsx'
import GamePage from './pages/game_page.jsx'
import Cart from './pages/cart.jsx'
import NotFoundPage from "./pages/not_found_page.jsx"

function App() {
	// important change that allows to manually handle scrolling on 'popstate' event
	window.history.scrollRestoration = 'manual';

	const [games_list, setGamesList] = React.useState([]);
	const [are_games_retrieved, setGamesRetrieved] = React.useState(false);

	const [cart_content, setCartContent] = React.useState([]);
	const [is_cart_init, setCartInit] = React.useState(false);

	React.useEffect(() => {
		axios.get('http://localhost:8081/games')
		.then(response => { setGamesList(response.data); setGamesRetrieved(true);})
		.catch(error => console.error(error));
	}, []);


	React.useEffect(() => {
		if (are_games_retrieved) {

			axios.get('http://localhost:8081/cart')
			.then(response => {
				const received_IDs = response.data[0].cart_content;

				const games_IDs_in_cart = received_IDs.split(',');

				let games_in_cart_table = [];

				for (let ID of games_IDs_in_cart) {
					games_in_cart_table = games_in_cart_table.concat(games_list.filter(item => item.id == ID));
				}

				setCartContent(games_in_cart_table);
				setCartInit(true);
			})
			.catch(error => console.error(error));

		}
		
	}, [are_games_retrieved]);


	React.useEffect(() => {
		if (is_cart_init) {
			const IDs = cart_content.map(item => {return item.id});

			axios.post('http://localhost:8081/updateCart', IDs).catch(error => console.error(error));
		}
	}, [cart_content])


	function canBeAddedToCart(game) {
		return cart_content.find(item => item.id == game.id) !== undefined
	}

	function addToCart(game) {
		setCartContent([...cart_content, game]);

		showMessage("add");
	}

	function removeFromCart(game_id) {
		const new_cart_content = cart_content.filter((item) => item.id !== game_id);

		setCartContent(new_cart_content);

		showMessage("remove");
	}

	function clearCart() {
		setCartContent([]);

		showMessage("clear");
	}


	const initial_device_type = window.innerWidth < 500 ? "mobile" : "desktop";

	const [device_type, setDeviceType] = React.useState(initial_device_type);

	window.addEventListener("resize", (event) => {
		if (window.innerWidth > 500) {
			setDeviceType("desktop");
		} else {
			setDeviceType("mobile");
		}
	})


	const [was_added, setAdded] = React.useState(false);
	const [was_removed, setRemoved] = React.useState(false);
	const [was_cleared, setCleared] = React.useState(false);

	function showMessage(type) {
		// reset states to clear all previous messages
		setAdded(false);
		setRemoved(false);
		setCleared(false);

		if (type === "add") {
			setAdded(true);

			toggleMessage(type);

		} else if (type === "remove") {
			setRemoved(true);

			toggleMessage(type);

		} else if (type === "clear") {
			setCleared(true);

			toggleMessage(type);
		}
	}

	function toggleMessage(type) {
		if (type === "add") {
			setTimeout(setAddedMessageTimeout, 5000);
		} else if (type === "remove") {
			setTimeout(setRemovedMessageTimeout, 5000);
		} else if (type === "clear") {
			setTimeout(setClearedMessageTimeout, 5000);
		}
	}

	function setAddedMessageTimeout() {
		setAdded(false);
	}

	function setRemovedMessageTimeout() {
		setRemoved(false);
	}

	function setClearedMessageTimeout() {
		setCleared(false);
	}

	function resetMessages() {
		setAdded(false);
		setRemoved(false);
		setCleared(false);
	}



	if (are_games_retrieved && is_cart_init) {
		return(
			<BrowserRouter basename="/">
				<Routes>
					<Route element={<Layout device_type={device_type} cart_content={cart_content} was_added={was_added} was_removed={was_removed} was_cleared={was_cleared} resetMessages={resetMessages} />} >
						<Route path="/" element={<Home device_type={device_type} games_list={games_list} />} />
						<Route path="/games/:id" element={<GamePage device_type={device_type} addToCartFunction={addToCart} isDuplicate={canBeAddedToCart} />} />
						<Route path="/cart" element={<Cart cart_content={cart_content} onRemove={removeFromCart} onCartClear={clearCart} />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		)
	}
	
}

export default App;
