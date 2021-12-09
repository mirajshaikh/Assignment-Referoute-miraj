/** @format */

import React from 'react';
import './RightSideBar.scss';
import google from '../../images/google.png';
import fb from '../../images/fb.png';
import meta from '../../images/meta.png';
import ms from '../../images/ms.jpeg';
import nf from '../../images/nf.jpeg';

function RightSideBar() {
	return (
		<div id='right-sidebar'>
			<div>Recommendation</div>
			<div className='recom'>
				<img src={google} alt='' width='60px' height='60px' />
				<h4>Google</h4>
			</div>
			<div className='recom'>
				<img src={fb} alt='' width='60px' height='60px' />
				<h4>Facebook</h4>
			</div>
			<div className='recom'>
				<img src={meta} alt='' width='60px' height='60px' />
				<h4>Meta</h4>
			</div>
			<div className='recom'>
				<img src={ms} alt='' width='60px' height='60px' />
				<h4>Microsoft</h4>
			</div>
			<div className='recom'>
				<img src={nf} alt='' width='60px' height='60px' />
				<h4>Netflix</h4>
			</div>
		</div>
	);
}

export default RightSideBar;
