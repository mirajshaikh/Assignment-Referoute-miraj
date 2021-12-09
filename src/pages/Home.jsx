/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../components/Content';
import LeftSideBar from '../components/sidebar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar';
import './home.scss';
import EditProfile from '../components/EditProfile';
const baseurl = import.meta.env.VITE_APP_HOST;

// eslint-disable-next-line react/prop-types
function Home({ jwt, setLoggedin, setJwt }) {
	const [edit, setEdit] = useState(false);
	const [userDetail, setUserDetail] = useState('');
	const getuserDetail = async () => {
		const data = await axios.get(
			baseurl + '/users/me',

			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		setUserDetail(data.data);
	};
	useEffect(() => {
		jwt ? getuserDetail() : '';
	}, [jwt]);
	return (
		<div id='home'>
			<LeftSideBar
				setLoggedin={setLoggedin}
				jwt={jwt}
				setJwt={setJwt}
				setEdit={setEdit}
				userDetail={userDetail}
			/>
			{edit ? (
				<EditProfile
					setEdit={setEdit}
					userDetail={userDetail}
					getuserDetail={getuserDetail}
				/>
			) : (
				<Content jwt={jwt} />
			)}
			<RightSideBar />
		</div>
	);
}

export default Home;
