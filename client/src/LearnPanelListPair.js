import React from "react";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";

function LearnPanelListPair({ id, English, Finnish }) {
	return (
		<tr>
			<td className="learn_panel_colum_p1">
				<p>{English}</p>
			</td>
			<td className="learn_panel_colum_p2"></td>
			<td></td>
		</tr>
	);
}

export default LearnPanelListPair;
