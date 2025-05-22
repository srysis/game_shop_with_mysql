import React from 'react'

function Filter({filter, onChangeHandler}) {
	return(
		<label htmlFor={filter.toLowerCase()} className="checkbox_container">
			{filter}
			<input type="checkbox" name="tag_filter" id={filter.toLowerCase()} value={filter} onChange={(event) => { onChangeHandler(event.target, event.target.value.toLowerCase()); } } />
			<span className="checkmark"></span>
		</label>
	)
}

export default Filter;