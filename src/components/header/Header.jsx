/** @format */

import React from 'react';
import './header.scss';

function Header() {
	return (
		<header id='Header'>
			<div className='flex'>
				<div className='logo'>LOGO</div>
				<div className='navmenu'>
					<ul>
						<li>HOME</li>
						<li>MY PROFILE</li>
						<li>LOGIN</li>
						<li>SIGN UP</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
