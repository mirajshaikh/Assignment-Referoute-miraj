/** @format */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import './Posts.scss';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

function Posts({ title, desc, date }) {
	const [howLong, setHowLong] = useState('');
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		const date1 = dayjs();
		const date2 = dayjs(date);
		date1.diff(date2) > 10025333
			? setHowLong(dayjs(date).format('DD MMMM YYYY'))
			: setHowLong(dayjs(date).fromNow());
	}, [date]);

	return (
		<div id='posts'>
			<div className='postitems'>
				<div className='titleandtime'>
					<div className='titleContainer'>
						<h3>{title}</h3>
					</div>
					<div className='likeContainer'>
						<p>{howLong}</p>
						{liked ? (
							<div>
								<TiHeartFullOutline
									size='25px'
									color='#ff178b'
									onClick={() => setLiked(!liked)}
								/>
							</div>
						) : (
							<div>
								<TiHeartOutline
									size='25px'
									onClick={() => setLiked(!liked)}
								/>
							</div>
						)}
					</div>
				</div>
				<p>{desc}</p>
			</div>
		</div>
	);
}

export default Posts;
