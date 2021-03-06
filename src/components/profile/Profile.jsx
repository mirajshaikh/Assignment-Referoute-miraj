/** @format */
/* eslint-disable react/prop-types */

import React from 'react';
import ProfileImg from '../../images/default.png';
import './Profile.scss';

function Profile({ userDetail }) {
	return (
		<div id='profile'>
			<div className='imageContainer'>
				<img
					src={userDetail?.image ? `${userDetail?.image}` : ProfileImg}
					alt=''
					width='80px'
				/>
			</div>
			<h4 className='userName'>
				{userDetail?.name ? userDetail?.name : 'Name'}
			</h4>
		</div>
	);
}

export default Profile;
