/** @format */
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/LoginRegister';

function App() {
	const [loggedin, setLoggedin] = useState(false);
	const [jwt, setJwt] = useState('');
	let jwttoken = localStorage.getItem('jwt');
	useEffect(() => {
		setJwt(jwttoken);
		console.log('check jwt', jwttoken);
		if (jwttoken) {
			setLoggedin(true);
			console.log('run login check');
		} else {
			setLoggedin(false);
		}
	}, [jwttoken]);

	return (
		<div id='App'>
			{!loggedin && !jwt ? (
				<Login setLoggedin={setLoggedin} setJwt={setJwt} />
			) : (
				<Home jwt={jwt} setJwt={setJwt} setLoggedin={setLoggedin} />
			)}
		</div>
	);
}

export default App;
