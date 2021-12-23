import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import { ListGroup } from "react-bootstrap";
import AdminPanelListPair from "./AdminPanelListPair";

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

	const refreshWordPairs = (password, username, setPopup, havePopup) => {
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
				if (havePopup) {
					setPopup(true, "Refresh successful");
				}
				return data;
			})
			.catch((err) => {
				setPopup(true, err.toString());
			});
	};

	const submitPair = () => {
		const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&finnish=${finnishWord}&english=${englishWord}`;
		fetch(url, { method: "POST" })
			.then(async (response) => {
				if (response.ok) {
					return response.json();
				} else {
					let responseJson = await response.json();
					throw new Error(responseJson.msg);
				}
			})
			.then((data) => {
				setPopup(true, data.msg);
				refreshWordPairs(password, username, setPopup, false);
			})
			.catch((error) => {
				setPopup(true, error.toString());
			});
	};

	const deletePair = (id) => {
		const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&id=${id}`;
		fetch(url, { method: "DELETE" })
			.then(async (response) => {
				if (response.ok) {
					return response.json();
				} else {
					let responseJson = await response.json();
					throw new Error(responseJson.msg);
				}
			})
			.then((data) => {
				setPopup(true, data.msg);
				refreshWordPairs(password, username, setPopup, false);
			})
			.catch((error) => {
				setPopup(true, error.toString());
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
							submitPair();
						}}
					>
						Submit
					</Button>
				</Form>
			</div>

			<div className="admin_panel_title_wordpairs">
				<h4>Existing Word Pairs</h4>
				<Button
					variant="info"
					className="admin_panel_title_wordpairs_button"
					onClick={(e) => {
						e.preventDefault();
						refreshWordPairs(password, username, setPopup, true);
					}}
				>
					Refresh
				</Button>
				<Button
					variant="danger"
					className="admin_panel_title_wordpairs_button"
				>
					Delete All
				</Button>
			</div>

			<div className="admin_panel_column_titles">
				<h4>English</h4>
				<h4>Finnish</h4>
			</div>
			<ListGroup>
				{wordPairs ? (
					wordPairs.map(({ English, Finnish, id }) => {
						return (
							<AdminPanelListPair
								id={id}
								English={English}
								Finnish={Finnish}
								deletePair={deletePair}
								key={id}
							></AdminPanelListPair>
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
