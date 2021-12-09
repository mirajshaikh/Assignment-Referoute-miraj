/** @format */

import React from 'react';
import Menu from '../menu/Menu';
import Profile from '../profile/Profile';
import './LeftSideBar.scss';
// eslint-disable-next-line react/prop-types
function LeftSideBar({ setLoggedin, jwt, setJwt, setEdit, userDetail }) {
	return (
		<div id='left-sidebar'>
			<Profile userDetail={userDetail} />
			<Menu
				setLoggedin={setLoggedin}
				jwt={jwt}
				setJwt={setJwt}
				setEdit={setEdit}
			/>
		</div>
	);
}

export default LeftSideBar;
