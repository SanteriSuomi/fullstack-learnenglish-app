import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
}

export default App;
