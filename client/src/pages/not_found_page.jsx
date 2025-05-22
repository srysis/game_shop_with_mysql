import React from "react"
import { Link } from "react-router";

import "../style/error404.scss"

function NotFoundPage() {
	return(
		<div id="error_container">
			<h1>404 Not Found</h1>
			<p>Looks like you are lost...</p>
			<Link to="/">Press here to come back</Link>
		</div>
	)
}

export default NotFoundPage;