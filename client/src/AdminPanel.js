import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";

function AdminPanel() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [openErrorPopup, setOpenErrorPopup] = useState({
		open: false,
		msg: "error",
	});

	return (
		<div>
			<h2 className="admin_panel_title">Admin Panel</h2>
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
										throw new Error(responseJson.error);
									}
								})
								.then((data) => {
									console.log(data);
								})
								.catch((error) => {
									setOpenErrorPopup({
										open: true,
										msg: error.toString(),
									});
									console.log(openErrorPopup.open);
								});
						}}
					>
						Sign-in
					</Button>
				</Form>
				<Popup open={openErrorPopup.open} modal closeOnDocumentClick>
					<Alert variant="warning">{openErrorPopup.msg}</Alert>
				</Popup>
			</div>
		</div>
	);
}

export default AdminPanel;
