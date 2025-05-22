import React from "react"

function useTitle(title) {
	React.useEffect(() => {
		document.title = `${title}`
	}, [])
}

export default useTitle;