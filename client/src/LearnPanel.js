import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./LearnPanel.css";
import LearnPanelListPair from "./LearnPanelListPair";

function LearnPanel() {
	const [wordPairs, setWordPairs] = useState(undefined);
	const [hidden, setHidden] = useState(false);

	const refreshWordPairs = () => {
		const url = `http://${process.env.REACT_APP_api_host}/wordpairs?username=${process.env.REACT_APP_api_user}&password=${process.env.REACT_APP_api_password}`;
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
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getCompletedAmount = () => {
		if (wordPairs === undefined) {
			return 0;
		}
		let amount = 0;
		wordPairs.forEach((element) => {
			if (element.Completed) {
				amount++;
			}
		});
		return amount;
	};

	const hideOrShowCompleted = () => {
		if (hidden) {
			refreshWordPairs();
			setHidden(false);
		} else {
			let newWordPairs = [];
			wordPairs.forEach((element) => {
				if (!element.Completed) {
					newWordPairs.push(element);
				}
			});
			setWordPairs(newWordPairs);
			setHidden(true);
		}
	};

	React.useEffect(() => {
		if (wordPairs) return;
		refreshWordPairs();
	}, [wordPairs]);

	return (
		<div>
			<h2 className="learn_panel_title">Learn</h2>
			<div className="learn_panel_sub_title">
				<h5>
					Learn new English words by practicing them on this page!
				</h5>
				<h5 className="learn_panel_sub_title_completed">{`Completed: ${getCompletedAmount()}/${
					wordPairs !== undefined ? wordPairs.length : 0
				}`}</h5>
				<Button
					variant="primary"
					style={{ marginLeft: "2%" }}
					onClick={hideOrShowCompleted}
				>
					{hidden ? "Show Completed" : "Hide Completed"}
				</Button>
			</div>
			<div className="learn_panel">
				<Table bordered size="sm">
					<thead>
						<tr>
							<th>English</th>
							<th>Finnish</th>
							<th>Completed</th>
						</tr>
					</thead>
					<tbody>
						{wordPairs ? (
							wordPairs.map(
								({ English, Finnish, Completed, id }) => {
									return (
										<LearnPanelListPair
											id={id}
											English={English}
											Finnish={Finnish}
											Completed={Completed}
											key={id}
										></LearnPanelListPair>
									);
								}
							)
						) : (
							<tr></tr>
						)}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default LearnPanel;
