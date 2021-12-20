import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import AdminPanelLogin from "./AdminPanelLogin";
import AdminPanelControl from "./AdminPanelControl";

function AdminPanel() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [openPopup, setOpenPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");
	const [popupTimeout, setPopupTimeout] = useState(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const setPopup = (value, msg) => {
		setOpenPopup(value);
		setPopupMessage(msg);
		if (popupTimeout) {
			clearTimeout(popupTimeout);
		}
		setPopupTimeout(
			setTimeout(() => {
				setOpenPopup(!value);
			}, 4000)
		);
	};

	if (isLoggedIn) {
		return (
			<AdminPanelControl
				setUsername={setUsername}
				setPassword={setPassword}
				setPopup={setPopup}
				setOpenPopup={setOpenPopup}
				openPopup={openPopup}
				popupMessage={popupMessage}
				username={username}
				password={password}
				setIsLoggedIn={setIsLoggedIn}
			></AdminPanelControl>
		);
	} else {
		return (
			<AdminPanelLogin
				setUsername={setUsername}
				setPassword={setPassword}
				setPopup={setPopup}
				setOpenPopup={setOpenPopup}
				openPopup={openPopup}
				popupMessage={popupMessage}
				username={username}
				password={password}
				setIsLoggedIn={setIsLoggedIn}
			></AdminPanelLogin>
		);
	}
}

export default AdminPanel;
