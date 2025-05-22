import React from 'react';

import cross from "../../files/cross.svg"

function ScreenshotOverlay( {device_type, image_list, image, path_to_screenshots, image_index, toggleFullscreenFunction} ) {
	const image_paths = Object.values(image_list);

	const [current_image_index, setCurrentImageIndex] = React.useState(image_index);

	React.useEffect(() => {
		let requested_image = image_paths[current_image_index - 1];

		let full_path_to_image = path_to_screenshots + requested_image;
		
		let image_container = document.querySelector("img.image_fullscreen");
		image_container.setAttribute("src", full_path_to_image);
	}, [current_image_index])

	function switchToPreviousImage() {
		let temp_index = current_image_index;

		temp_index--;

		if (temp_index <= 0) {
			temp_index = image_paths.length;
		}

		setCurrentImageIndex(temp_index)
	}

	function switchToNextImage() {
		let temp_index = current_image_index;

		temp_index++;

		if (temp_index > image_paths.length) {
			temp_index = 1;
		}

		setCurrentImageIndex(temp_index);
	}

	if (device_type === "desktop") {
		return(
			<div id="image_fullscreen_overlay_container">
				<button type="button" id="prev_image" onClick={() => switchToPreviousImage()} >&lt;</button> 
				<img className="image_fullscreen" src={path_to_screenshots + image} alt="" />
				<button type="button" id="next_image" onClick={() => switchToNextImage()} >&gt;</button>
				<button type="button" id="close_button" ><img src={cross} onClick={() => { toggleFullscreenFunction(false) } } /></button>
			</div>
		)
	}

	if (device_type === "mobile") {
		return(
			<div id="image_fullscreen_overlay_container">
				<img className="image_fullscreen" src={path_to_screenshots + image} alt="" />
				<div>
					<button type="button" id="prev_image" onClick={() => switchToPreviousImage()} >&lt;</button> 
					<button type="button" id="next_image" onClick={() => switchToNextImage()} >&gt;</button>
				</div>
				<button type="button" id="close_button" ><img src={cross} onClick={() => { toggleFullscreenFunction(false) } } /></button>
			</div>
		)
	}
}

export default ScreenshotOverlay;