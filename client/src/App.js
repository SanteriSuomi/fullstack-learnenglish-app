import React from "react";

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/test")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h2>Learn English!</h2>
				<p>{!data ? "Loading..." : data}</p>
			</header>
		</div>
	);
}

export default App;
