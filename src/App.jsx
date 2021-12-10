/** @format */
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/LoginRegister';

function App() {
	const [loggedin, setLoggedin] = useState(false);
	const [jwt, setJwt] = useState('');
	const [width, setWidth] = useState(800);
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
	useEffect(() => {
		var newWidth = window.innerWidth;
		setWidth(newWidth);
		window.addEventListener('resize', function () {
			var newWidth = window.innerWidth;
			setWidth(newWidth);
		});
	}, []);

	return (
		<div id='App'>
			{width > 600 ? (
				!loggedin && !jwt ? (
					<Login setLoggedin={setLoggedin} setJwt={setJwt} />
				) : (
					<Home jwt={jwt} setJwt={setJwt} setLoggedin={setLoggedin} />
				)
			) : (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
						width: '100vw',
					}}>
					<h3>
						This Page is not Mobile responsive yet. <br />
						Please open the url in desktop
					</h3>
				</div>
			)}
		</div>
	);
}

export default App;
