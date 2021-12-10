/** @format */

import React, { useEffect, useState } from 'react';
import './Content.scss';
import axios from 'axios';
import NewPost from './NewPost';
import Posts from './Posts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const baseurl = import.meta.env.VITE_APP_HOST;
// eslint-disable-next-line react/prop-types
function Content({ jwt }) {
	const [postdata, setPostdata] = useState('');
	const [isloadingData, setIsLoadingData] = useState(false);
	async function getdata(time) {
		setIsLoadingData(true);
		const data = await axios.get(baseurl + '/posts?_sort=id:DESC');
		setPostdata(data.data);
		setTimeout(() => {
			setIsLoadingData(false);
		}, time);
		console.log(data.data.data);
	}
	useEffect(() => {
		getdata(1000);
	}, []);

	return (
		<div id='content'>
			<NewPost jwt={jwt} getdata={getdata} />
			{isloadingData && (
				<>
					<div className='skeletondiv'>
						<Skeleton
							height='150px'
							borderRadius='10px'
							baseColor='#f5f5f5'
							highlightColor='#ffffffa2'
						/>
						<div className='dual'>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
							/>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								width='90%'
							/>
						</div>
						<div className='skepara'>
							<Skeleton
								height='20px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								count={3}
							/>
						</div>
					</div>
					<div className='skeletondiv'>
						<Skeleton
							height='150px'
							borderRadius='10px'
							baseColor='#f5f5f5'
							highlightColor='#ffffffa2'
						/>
						<div className='dual'>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
							/>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								width='90%'
							/>
						</div>
						<div className='skepara'>
							<Skeleton
								height='20px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								count={3}
							/>
						</div>
					</div>
					<div className='skeletondiv'>
						<Skeleton
							height='150px'
							borderRadius='10px'
							baseColor='#f5f5f5'
							highlightColor='#ffffffa2'
						/>
						<div className='dual'>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
							/>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								width='90%'
							/>
						</div>
						<div className='skepara'>
							<Skeleton
								height='20px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								count={3}
							/>
						</div>
					</div>
					<div className='skeletondiv'>
						<Skeleton
							height='150px'
							borderRadius='10px'
							baseColor='#f5f5f5'
							highlightColor='#ffffffa2'
						/>
						<div className='dual'>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
							/>
							<Skeleton
								height='30px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								width='90%'
							/>
						</div>
						<div className='skepara'>
							<Skeleton
								height='20px'
								borderRadius='10px'
								baseColor='#dddddd'
								highlightColor='#ffffffa2'
								count={3}
							/>
						</div>
					</div>
				</>
			)}
			{postdata &&
				!isloadingData &&
				postdata.map((post, index) => {
					return (
						<Posts
							title={post?.title}
							desc={post?.desc}
							date={post?.date}
							key={index}
						/>
					);
				})}
		</div>
	);
}

export default Content;
