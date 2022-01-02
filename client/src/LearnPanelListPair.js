import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";

function LearnPanelListPair({ id, English, Finnish, Completed }) {
	const [userFinnish, setUserFinnish] = useState("");
	return (
		<tr>
			<td className="learn_panel_colum_p1">
				<p>{English}</p>
			</td>
			<td className="learn_panel_colum_p2">
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
								console.log("good job!");
							}
						}}
					>
						Submit
					</Button>
				</Form>
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
