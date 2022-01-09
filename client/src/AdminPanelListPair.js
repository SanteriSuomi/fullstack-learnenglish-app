import React from "react";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";

/**
 * Component representing one word pair on the admin panel list
 * @param {*} param0 React properties, (word pair ID, English word, Finnish word, completed state) in order
 * @returns HTML of the component
 */
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
				<Popup
					trigger={
						<Button
							variant="danger"
							className="admin_panel_title_wordpairs_button"
						>
							Delete
						</Button>
					}
					position="left center"
				>
					<div>
						<p>Are you sure you want to delete this word pair?</p>
						<Button
							variant="danger"
							className="admin_panel_title_wordpairs_button_delete"
							onClick={(e) => {
								e.preventDefault();
								deletePair(id);
							}}
						>
							Delete
						</Button>
					</div>
				</Popup>
			</td>
		</tr>
	);
}

export default AdminPanelListPair;
