import React from "react"

import "../style/layout/footer.scss"
import "../style/layout/mobile/footer.scss"

function Footer() {
	return(
		<footer>
			<div>
				<h3 id="source_code_link">
					<a target="_blank" href="https://github.com/srysis/game_shop">Source code</a>
				</h3>
			</div>
			<div>
				<p>All assets and information about games were taken from <a target="_blank" href="https://store.steampowered.com/"><b>Steam</b></a>.</p>
				<p>All materials were taken for educational purpose.</p>
			</div>
		</footer>
	)
}

export default Footer