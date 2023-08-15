import React, { useState, useEffect, useRef, useContext } from 'react'
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../../styles/searchbar.css";


const SearchBar = () => {

	const navigate = useNavigate()
	const [isExpanded, setIsExpanded] = useState(false);
	const [loadingIsActive, setLoadingIsActive] = useState(false)
	const [searchContent, setSearchContent] = useState('')
	const searchRef = useRef(null);
	const { store, actions } = useContext(Context)

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsExpanded(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	const handleExpandedSearch = (value) => {
		// clearTimeout(timerId); // Limpiamos el temporizador existente (si lo hay)
		// // setLoadingIsActive(true)

		// const timerId = setTimeout(() => {
		// 	// return setLoadingIsActive(false)
		// }, 3000);
		setSearchContent(value)
	}

	const handleSearchClick = () => {
		actions.expandedSearch(searchContent);
		navigate('/explorer')
	}

	return (
		<div className='m-2'>
			<div className={`input-group ${isExpanded ? "expanded" : ""}`} ref={searchRef}>
				<input
					id="search-input"
					className={`search-click border-start-0 ${isExpanded ? "expanded" : ""}`}
					type="search"
					placeholder="Buscar artistas, álbumes y otros..."
					aria-label="Search"
					onChange={(e) => handleExpandedSearch(e.target.value)}
					value={searchContent}
				/>
				<span
					id="search-icon"
					className="search-icon input-group-text bg-white border-end-0"
					onClick={() => handleSearchClick()}
				>
					<i className="fa-solid fa-magnifying-glass"></i>
				</span>
			</div>
			{/* {loadingIsActive && <div className="loading-icon"></div>} */}
		</div>
	)
}


export default SearchBar





