const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const body_parser = require('body-parser');

const app = express();
app.use(express());
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));



const database = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'game_shop_db'
});

// root
app.get('/', (request, response) => {
	return response.json("This is a root of localhost on port 8081.");
});

// API call to select all games
app.get('/games', (request, response) => {
	const sql_query = "SELECT `games`.`id`, `games`.`name`, `games`.`box_art`, `games`.`price`, `tags`.`tags_list`" +
					  "FROM games INNER JOIN tags ON games.id = tags.id";
	
	database.query(sql_query, (error, data) => {
		if (error) return response.json(error);

		console.log(data);
		return response.json(data);
	})
})

// API call to select a game where it's 'id' matches the 'id' passed in 'params' of 'request'
app.get('/games/:id', (request, response) => {
	const requsted_game_id = request.params.id;

	const sql_query = "SELECT `games`.`id`, `games`.`name`, `games`.`box_art`, `games`.`price`, `games`.`short_description`," + 
					  "`tags`.`tags_list`, `descriptions`.`description`, `screenshots_ld`.`screenshots` AS `screenshots_LD`," +
					  "`screenshots_hd`.`screenshots` AS `screenshots_HD` " +
					  "FROM ((((games INNER JOIN tags ON games.id = tags.id) INNER JOIN descriptions ON games.id = descriptions.id) " + 
					  "INNER JOIN screenshots_ld ON games.id = screenshots_ld.id) INNER JOIN screenshots_hd ON games.id = screenshots_hd.id)" +
					  "WHERE `games`.`id` = " + requsted_game_id;

	database.query(sql_query, (error, data) => {
		if (error) return response.json(error);

		console.log(data);
		return response.json(data);
	})
})

// API call to get cart's data
app.get('/cart', (request, response) => {
	const sql_query = "SELECT `cart_content` from `cart` WHERE `cart`.`id` = 1";

	database.query(sql_query, (error, data) => {
		if (error) return response.json(error);

		console.log(data);
		return response.json(data);
	})
})

//API call to save new cart's data in the database
app.post('/updateCart', (request, response, next) => {
	let received_IDs = request.body;

	const sql_query = "UPDATE `cart` SET `cart_content` = '" + received_IDs.toString() + "' WHERE `id` = 1";

	database.query(sql_query, (error, data) => {
		if (error) return response.json(error);

		console.log(data);
		return response.json(data);
	})
})

// API call to select any game where it's name matches the string passed in the request
app.post('/games/search', (request, response, next) => {
	let received_string = Object.keys(request.body);

	const sql_query = "SELECT `games`.`id`, `games`.`name`, `games`.`box_art`, `games`.`price` FROM games WHERE name LIKE '%" + received_string + "%'";

	database.query(sql_query, (error, data) => {
		if (error) return response.json(error);

		console.log(data);
		return response.json(data);
	})
})

app.listen(8081, () => {console.log("server runs on port 8081")});