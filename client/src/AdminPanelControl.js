import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import { ListGroup } from "react-bootstrap";

function AdminPanelControl({
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
	const [englishWord, setEnglishWord] = useState("");
	const [finnishWord, setFinnishWord] = useState("");
	const [wordPairs, setWordPairs] = useState(undefined);

	const refreshWordPairs = (password, username, setPopup) => {
		const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}`;
		fetch(url, { method: "GET" })
			.then(async (response) => {
				if (response.ok) {
					return response.json();
				} else {
					let responseJson = await response.json();
					throw new Error(responseJson.msg);
				}
			})
			.then((data) => {
				setWordPairs(data.msg);
				// setPopup(true, "Fetch successful");
				return data;
			})
			.catch((err) => {
				setPopup(true, err.toString());
			});
	};

	React.useEffect(() => {
		if (wordPairs) return;
		refreshWordPairs(password, username, setPopup);
	}, [password, username, wordPairs, setPopup]);

	return (
		<div>
			<h2 className="admin_panel_title">Admin Panel</h2>
			<h4 className="admin_panel_title">Submit Word Pairs</h4>
			<div className="sign_in_panel">
				<Form>
					<Form.Group>
						<Form.Label>English</Form.Label>
						<Form.Control
							placeholder="Enter English Word"
							onChange={(e) => {
								e.preventDefault();
								setEnglishWord(e.target.value);
							}}
						/>
					</Form.Group>
					<div style={{ padding: "1%" }}></div>
					<Form.Group>
						<Form.Label>Finnish</Form.Label>
						<Form.Control
							placeholder="Enter Finnish Word"
							onChange={(e) => {
								e.preventDefault();
								setFinnishWord(e.target.value);
							}}
						/>
					</Form.Group>
					<div style={{ padding: "1%" }}></div>
					<Button
						variant="primary"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&finnish=${finnishWord}&english=${englishWord}`;
							fetch(url, { method: "POST" })
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
									refreshWordPairs(
										password,
										username,
										setPopup
									);
								})
								.catch((error) => {
									setPopup(true, error.toString());
								});
						}}
					>
						Submit
					</Button>
				</Form>
			</div>

			<h4 className="admin_panel_title">Existing Word Pairs</h4>
			<ListGroup>
				{wordPairs ? (
					wordPairs.map(({ English, Finnish, id }) => {
						return (
							<ListGroup.Item key={id}>
								<p>English: {English}</p>
								<p>Finnish: {Finnish}</p>
							</ListGroup.Item>
						);
					})
				) : (
					<div></div>
				)}
			</ListGroup>

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
	);
}

export default AdminPanelControl;
