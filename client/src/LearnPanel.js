import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./LearnPanel.css";
import LearnPanelListPair from "./LearnPanelListPair";

function LearnPanel() {
	const [wordPairs, setWordPairs] = useState(undefined);

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

	React.useEffect(() => {
		if (wordPairs) return;
		refreshWordPairs();
	}, [wordPairs]);

	return (
		<div>
			<h2 className="learn_panel_title">Learn</h2>
			<h5 className="learn_panel_sub_title">
				Learn new English words by practicing them on this page!
			</h5>
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
							wordPairs.map(({ English, Finnish, id }) => {
								return (
									<LearnPanelListPair
										id={id}
										English={English}
										Finnish={Finnish}
										key={id}
									></LearnPanelListPair>
								);
							})
						) : (
							<div></div>
						)}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default LearnPanel;
