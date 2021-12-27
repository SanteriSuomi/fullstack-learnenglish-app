import React from "react";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import { Button } from "react-bootstrap";

function AdminPanelListPair({ id, English, Finnish, deletePair }) {
	return (
		<tr>
			<td>
				<p className="admin_panel_colum_p1">{English}</p>
			</td>
			<td>
				<p className="admin_panel_colum_p2">{Finnish}</p>
			</td>
			<td className="admin_panel_list_pair_button">
				<Button
					variant="danger"
					onClick={(e) => {
						e.preventDefault();
						deletePair(id);
					}}
				>
					Delete
				</Button>
			</td>
		</tr>
	);
}

export default AdminPanelListPair;
