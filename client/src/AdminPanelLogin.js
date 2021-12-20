import React from "react";
import { Form, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";

function AdminPanelLogin({
	setUsername,
	setPassword,
	setPopup,
	setOpenPopup,
	openPopup,
	popupMessage,
	username,
	password,
	setIsLoggedIn,
}) {
	return (
		<div>
			<h2 className="admin_panel_title">Admin Panel</h2>
			<h4 className="admin_panel_title">Log-in</h4>
			<div className="sign_in_panel">
				<Form>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							placeholder="Enter Username"
							onChange={(e) => {
								e.preventDefault();
								setUsername(e.target.value);
							}}
						/>
					</Form.Group>
					<div style={{ padding: "1%" }}></div>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							onChange={(e) => {
								e.preventDefault();
								setPassword(e.target.value);
							}}
						/>
					</Form.Group>
					<div style={{ padding: "1%" }}></div>
					<Button
						variant="primary"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							const url = `http://${process.env.REACT_APP_api_host}/authenticate?username=${username}&password=${password}`;
							fetch(url)
								.then(async (response) => {
									if (response.ok) {
										return response.json();
									} else {
										let responseJson =
											await response.json();
										throw new Error(responseJson.msg);
									}
								})
								.then((data) => {
									setPopup(true, data.msg);
									setIsLoggedIn(true);
								})
								.catch((error) => {
									setPopup(true, error.toString());
								});
						}}
					>
						Log-in
					</Button>
				</Form>
				<Popup
					open={openPopup}
					closeOnDocumentClick
					onClose={() => {
						setOpenPopup(false);
					}}
				>
					<div className="popup">
						<p>{popupMessage}</p>
					</div>
				</Popup>
				<Popup
					open={openPopup}
					closeOnDocumentClick
					onClose={() => {
						setOpenPopup(false);
					}}
				>
					<div className="popup">
						<p>{popupMessage}</p>
					</div>
				</Popup>
			</div>
		</div>
	);
}

export default AdminPanelLogin;
