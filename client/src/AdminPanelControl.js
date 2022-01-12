import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import AdminPanelListPair from "./AdminPanelListPair";

/**
 * Component representing admin panel control page (after logging in)
 * @param {*} param0 React properties, (setUsername function (not used), setPassword function (not used), setPopup function, setOpenPopup function, openPopup state, popupMessage string, username string, password string, setIsLoggedIn function) in order
 * @returns HTML of the component
 */
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

	/**
	 * Refresh wordPairs state by retrieving them from the database
	 * @param {*} password password of current logged in user
	 * @param {*} username username of current logged in user
	 * @param {*} setPopup setPopup function
	 * @param {*} havePopup whether popup should be activated
	 */
	const refreshWordPairs = (password, username, setPopup, havePopup) => {
		const url = `https://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}`;
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

	/**
	 * Submit current word pair, using the englishWord and finnishWord state
	 */
	const submitPair = () => {
		const url = `https://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&finnish=${finnishWord}&english=${englishWord}`;
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

	/**
	 * Delete a pair from database
	 * @param {*} id Id of the pair
	 */
	const deletePair = (id) => {
		const url = `https://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&id=${id}`;
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

	/**
	 * Delete all pairs from the database
	 */
	const deleteAll = () => {
		const url = `https://${process.env.REACT_APP_api_host}/wordpairs?username=${username}&password=${password}&all`;
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

	/**
	 * Initial word pairs refresh
	 */
	React.useEffect(() => {
		if (wordPairs) return;
		refreshWordPairs(password, username, setPopup);
	}, [password, username, wordPairs, setPopup]);

	return (
		<div>
			<h2 className="admin_panel_title">Admin Panel</h2>
			<h4 className="admin_panel_title">Upload New Word Pairs</h4>
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
				<Popup
					trigger={
						<Button
							variant="danger"
							className="admin_panel_title_wordpairs_button"
						>
							Delete All
						</Button>
					}
					position="right center"
				>
					<div>
						<p>Are you sure you want to delete all word pairs?</p>
						<Button
							variant="danger"
							className="admin_panel_title_wordpairs_button_delete"
							onClick={(e) => {
								e.preventDefault();
								deleteAll();
							}}
						>
							Delete All
						</Button>
					</div>
				</Popup>
			</div>

			<div className="admin_panel_table">
				<Table bordered size="sm">
					<thead>
						<tr>
							<th>English</th>
							<th>Finnish</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
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
							<tr></tr>
						)}
					</tbody>
				</Table>
			</div>

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
