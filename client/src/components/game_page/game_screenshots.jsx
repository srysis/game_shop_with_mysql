import React from 'react';

import Screenshot from "./screenshot.jsx"

// !! STARTING INDEX IS CONSIDERED AS 1 IN THIS COMPONENT

function GameScreenshots( {device_type, image_list, path_to_screenshots, toggleFullscreenFunction, setCurrentImageFunction, setCurrentImageIndexFunction} ) {
	// a state that is used to force a component re-render
	// for some reason React doesn't call a re-render after state change, so this workaround was implemented
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);

	const image_paths = Object.values(image_list);

	// create a clone of initial array of images paths and store it into a temporary array for modifications
	// it was done because attempting to simply assign an existing array to an empty one to create a copy, 
	// modifying a copy would also change the original array, hence why it is required to make a clone and not a copy
	let cloned_image_array = structuredClone(image_paths);

	// set the max amount of images to render depending on the device type
	// 1 for mobile and 3 for desktop version respectively
	if (device_type === "desktop") cloned_image_array.length = 3;
	if (device_type === "mobile") cloned_image_array.length = 1;

	// 'current_images' array will store paths to images that are or will be rendered;
	// it's elements will change after every call of 'goToLeft()' or 'goToRight()' functions;
	// initially, it stores first 3 images of 'image_list', so that only they are shown on a page
	const [current_images, setCurrentImages] = React.useState(cloned_image_array);

	// to properly define which images should render next and which shouldn't,
	// we need to keep track of which image is currently on the left end, and which is on the right end
	const [image_index_to_left, setImageIndexToLeft] = React.useState(1);
	const [image_index_to_right, setImageIndexToRight] = React.useState(cloned_image_array.length)

	// in case of switching between viewports, change max amount of images to render depending on the device type
	React.useEffect(() => {
		if (device_type === "desktop") cloned_image_array.length = 3;
		if (device_type === "mobile") cloned_image_array.length = 1;

		setCurrentImages(cloned_image_array);
		setImageIndexToLeft(1);
		setImageIndexToRight(cloned_image_array.length);
	}, []);

	// IMPORTANT NOTE: it is possible to trigger 'useEffect' hook on prop change...
	// due to how React handles states(?), 'current_images' were not updating on prop change
	// which could happen when going from one product page to another through search results.
	// so it is important to refresh 'current_images' with relevant data on 'image_list' prop change.
	// we also reset both indexes for image navigating
	React.useEffect(() => {
		setCurrentImages(cloned_image_array);
		setImageIndexToLeft(1);
		setImageIndexToRight(cloned_image_array.length);
	}, [image_list])


	// goToLeft() and goToRight() functions will calculate index values that should come next
	// so they will pull out the required path from 'image_paths' array and put it into a 'current_images' array

	function goToLeft() {
		let result_array = current_images;

		result_array.pop();
		
		// these vars will be used as a temp storage for next index value for each end
		let next_image_index_to_left = image_index_to_left;
		let next_image_index_to_right = image_index_to_right;

		next_image_index_to_left--;
		next_image_index_to_right--;

		// check if index value for left end will become less than 1
		// if it will - reset it to the length value of array that stores paths to images
		// aka last element index
		if (next_image_index_to_left < 1) {
			next_image_index_to_left = image_paths.length;
		}

		// same method for index value for right end
		if (next_image_index_to_right < 1) {
			next_image_index_to_right = image_paths.length;
		}

		// update both index values in states
		setImageIndexToLeft(next_image_index_to_left);
		setImageIndexToRight(next_image_index_to_right);

		// pull the string, positioned at required index, out of the array 
		// and put it at the beginning of the array that will be assigned to state array
		result_array.unshift(image_paths[next_image_index_to_left - 1]);

		// update array that stores paths to images that should be rendered
		setCurrentImages(result_array);

		// force re-render in order to render new images
		forceUpdate();
	}

	function goToRight() {
		let result_array = current_images;

		result_array.shift();
		
		// these vars will be used as a temp storage for next index value for each end
		let next_image_index_to_left = image_index_to_left;
		let next_image_index_to_right = image_index_to_right;

		next_image_index_to_left++;
		next_image_index_to_right++;


		// check if index value for left end will go out of bounds
		// if it will - reset it to 1, aka first element index
		if (next_image_index_to_left > image_paths.length) {
			next_image_index_to_left = 1;
		}

		// same method for index value for right end
		if (next_image_index_to_right > image_paths.length) {
			next_image_index_to_right = 1;
		}

		// update both index values in states
		setImageIndexToLeft(next_image_index_to_left);
		setImageIndexToRight(next_image_index_to_right);


		// pull the string, positioned at required index, out of the array 
		// and put it at the end of the array that will be assigned to state array
		result_array.push(image_paths[next_image_index_to_right - 1]);

		// update array that stores paths to images that should be rendered
		setCurrentImages(result_array);

		// force re-render in order to render new images
		forceUpdate();
	}


	// this function will iterate through 'image_paths' array
	// to find a matching name for given one
	// once found, it's index will be returned
	function setDataIndex(image_name) {
		let found_index = 0;

		image_paths.forEach((image, index) => {
			if (image_name === image) {
				found_index = index + 1;
			} 
		})

		return found_index;
	}


	if (device_type === "desktop") {
		return (
			<div className="game_screenshots" >
				<button type="button" className="left_button" onClick={ () => { goToLeft(); } } >&lt;</button>
				{current_images.map((image, index) => 
					{
						let found_index = setDataIndex(image);

						return <Screenshot 
									key={index + 1} 
									image_src={path_to_screenshots + image} 
									data_index={found_index}
									onClickHandler={ () => { 
											toggleFullscreenFunction(true); 
											setCurrentImageFunction(image);  
											setCurrentImageIndexFunction(found_index);
										} 
									} 
								/>
					}
				)}
				<button type="button" className="right_button" onClick={ () => { goToRight(); } } >&gt;</button>
			</div>
		)
	}

	if (device_type === "mobile") {
		return (
			<div className="game_screenshots" >
				{current_images.map((image, index) => 
					{
						let found_index = setDataIndex(image);

						return <Screenshot 
									key={index + 1} 
									image_src={path_to_screenshots + image} 
									data_index={found_index}
									onClickHandler={ () => { 
											toggleFullscreenFunction(true); 
											setCurrentImageFunction(image);  
											setCurrentImageIndexFunction(found_index);
										} 
									} 
								/>
					}
				)}
				<div className="buttons_container">
					<button type="button" className="left_button" onClick={ () => { goToLeft(); } } >&lt;</button>
					<button type="button" className="right_button" onClick={ () => { goToRight(); } } >&gt;</button>
				</div>
			</div>
		)
	}
}

export default GameScreenshots;