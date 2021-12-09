/** @format */

import React from 'react';
import './Menu.scss';
import { FaUserEdit, FaBell } from 'react-icons/fa';
import { RiMessage3Fill, RiLogoutCircleRLine } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';

// eslint-disable-next-line react/prop-types
function Menu({ setLoggedin, setJwt, setEdit }) {
	const logout = () => {
		setLoggedin(false);
		setJwt(false);
		localStorage.removeItem('jwt');
	};
	return (
		<div id='menu'>
			<div className='menuContainer'>
				<div
					className='menuItemsContainer'
					onClick={() => {
						setEdit(true);
					}}>
					<FaUserEdit size='25px' />
					<div className='menuTitle'>Edit Profile</div>
				</div>
				<div className='menuItemsContainer'>
					<FaBell size='23px' />
					<div className='menuTitle'>Notifications</div>
				</div>
				<div className='menuItemsContainer'>
					<RiMessage3Fill size='25px' />
					<div className='menuTitle'>Message</div>
				</div>
				<div className='menuItemsContainer'>
					<AiFillSetting size='25px' />
					<div className='menuTitle'>Setting</div>
				</div>
				<div className='menuItemsContainer logout' onClick={logout}>
					<RiLogoutCircleRLine size='25px' />
					<div className='menuTitle'>Logout</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
