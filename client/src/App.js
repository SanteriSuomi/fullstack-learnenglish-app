import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnPanel from "./LearnPanel";
import AdminPanel from "./AdminPanel";
import "./App.css";

/**
 * Inject environment
 */
require("dotenv").config();

/**
 * Application main function. Contains navigatio set-up
 * @returns Application HTML
 */
function App() {
	return (
		<div>
			<Navbar bg="dark" variant="dark" className="navbar">
				<Container>
					<Navbar.Brand className="navbar_brand">
						Learn English!
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/">Learn</Nav.Link>
						<Nav.Link href="/admin">Admin</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LearnPanel></LearnPanel>}></Route>
					<Route
						path="/admin"
						element={<AdminPanel></AdminPanel>}
					></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
