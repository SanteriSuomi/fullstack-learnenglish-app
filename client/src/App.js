import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPanel from "./MainPanel";
import GamePanel from "./GamePanel";
import AdminPanel from "./AdminPanel";
import "./App.css";

function App() {
	// const [data, setData] = React.useState(null);

	// React.useEffect(() => {
	// 	fetch("/test")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setData(data);
	// 			return data;
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);

	return (
		<div>
			<Navbar bg="dark" variant="dark" className="navbar">
				<Container>
					<Navbar.Brand href="/" className="navbar_brand">
						Learn English!
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/game">Game</Nav.Link>
						<Nav.Link href="/admin">Admin</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPanel></MainPanel>}></Route>
					<Route
						path="/game"
						element={<GamePanel></GamePanel>}
					></Route>
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
