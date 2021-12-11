import React from "react";

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/test")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				return data;
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h2>Learn English!</h2>
				{!data
					? "Loading..."
					: data.map((obj) => {
							return <p key={obj.id}>{obj.name}</p>;
					  })}
			</header>
		</div>
	);
}

export default App;
