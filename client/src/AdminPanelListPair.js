import React from "react";
import { ListGroup } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import "./AdminPanel.css";
import { Button } from "react-bootstrap";

function AdminPanelListPair({ id, English, Finnish, deletePair }) {
	return (
		<ListGroup.Item key={id} className="admin_panel_column_titles">
			<Button
				variant="danger"
				onClick={(e) => {
					e.preventDefault();
					deletePair(id);
				}}
			>
				Delete
			</Button>
			<p className="admin_panel_colum_p1">{English}</p>
			<p className="admin_panel_colum_p2">{Finnish}</p>
		</ListGroup.Item>
	);
}

export default AdminPanelListPair;
