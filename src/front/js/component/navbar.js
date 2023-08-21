
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'

import { UserNavbar } from './UserNavbar.jsx'
import { AdminNavbar } from './AdminNavbar.jsx'
import { GuestNavbar } from "./GuestNavbar.jsx";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const Auth = localStorage.getItem('Auth');
	const navigate = useNavigate()
	const logged = localStorage.getItem('token');
	const { actions } = useContext(Context);

	const handlerNavigateToExplorer = async () => {
		await actions.search();
		navigate('/explorer')
	}

	const handleLoginClick = (e) => {
		sessionStorage.setItem("lastVisitedPage", window.location.href);
		navigate("/login");
	};

	const handleLogoutClick = () => {
		actions.logout();
		navigate("/");
	};

	let NavbarComponent;

	if (Auth === 'true') {
		NavbarComponent = <AdminNavbar />;
	} else if (logged != '') {
		NavbarComponent = <UserNavbar />;
	} else {
		NavbarComponent = <GuestNavbar />;
	}

	return (
		<div>
			{NavbarComponent}
		</div>
	);
};
