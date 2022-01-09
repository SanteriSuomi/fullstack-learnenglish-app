import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";

/**
 * Component representing one word pair on the learn page list
 * @param {*} param0 React properties, (word pair ID, English word, Finnish word, completed state) in order
 * @returns HTML of the component
 */
function LearnPanelListPair({ id, English, Finnish, Completed }) {
	const [userFinnish, setUserFinnish] = useState("");

	/**
	 * Set a specific word pair completed variable
	 * @param {*} completed State of completed (true or false)
	 */
	const setCompleted = (completed) => {
		const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${process.env.REACT_APP_api_user}&password=${process.env.REACT_APP_api_password}&id=${id}&completed=${completed}`;
		fetch(url, { method: "PUT" })
			.then(async (response) => {
				if (response.ok) {
					return response.json();
				} else {
					let responseJson = await response.json();
					throw new Error(responseJson.msg);
				}
			})
			.then((data) => {
				// This is just here to update the page components
				window.location.reload(false);
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<tr>
			<td className="learn_panel_colum_p1">
				<p>{English}</p>
			</td>
			<td className="learn_panel_colum_p2">
				<span>
					{Completed === 1 ? (
						Finnish
					) : (
						<Form>
							<Form.Group
								className="mb-3"
								onChange={(e) => {
									e.preventDefault();
									setUserFinnish(e.target.value);
								}}
							>
								<Form.Control placeholder="Enter Finnish Equivalent" />
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									if (
										userFinnish.toLowerCase() ===
										Finnish.toLowerCase()
									) {
										setCompleted(1);
									}
								}}
							>
								Submit
							</Button>
						</Form>
					)}
				</span>
			</td>
			<td>
				<span>
					{Completed === 1 ? (
						<span role="img">✔</span>
					) : (
						<span role="img">❌</span>
					)}
				</span>
			</td>
		</tr>
	);
}

export default LearnPanelListPair;
