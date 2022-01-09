import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import AdminPanelLogin from "./AdminPanelLogin";
import AdminPanelControl from "./AdminPanelControl";

/**
 * Admin panel root component. Contains some commonly used functions for both the log-in and the control admin view
 * @returns HTML of the component
 */
function AdminPanel() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [openPopup, setOpenPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");
	const [popupTimeout, setPopupTimeout] = useState(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	/**
	 * Activate/deactivate a new popup on admin panel
	 * @param {*} popupState Activate/deactivate poup
	 * @param {*} msg If activate popup, what message to display
	 */
	const setPopup = (popupState, msg) => {
		setOpenPopup(popupState);
		setPopupMessage(msg);
		if (popupTimeout) {
			clearTimeout(popupTimeout);
		}
		setPopupTimeout(
			setTimeout(() => {
				setOpenPopup(!popupState);
			}, 2500)
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
