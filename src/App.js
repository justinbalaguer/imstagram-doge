import React, { useEffect, useState } from 'react';
import './style/style.scss';
import logo from './imstagram.png';
import profile from './doge.png';
/* FA */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';

/* REACT ICONS */
import { BsHeart, BsChat, BsCursor, BsBookmark, BsSearch, BsPlusSquare } from 'react-icons/bs';

library.add(fab);

/* start */
const dogNames = require('dog-names');
const movieQuote = require('popular-movie-quotes');
const axios = require('axios');

/* main */

const App = () => {
	return (
		<center>
		<div className="App">
			<Navigation />
			<div className='content'>
			<GetDogsPicture />
			</div>
			<Footer />
		</div>
		</center>
	);
};

/* components */

const Navigation = () => (
	<div className='navigation'>
		<div className='nav-top'>
			<div className='nav-container'>
				<b><FontAwesomeIcon icon={['fab', 'instagram']} />&nbsp;<img src={logo} alt='imstagram-logo'/></b>
				<BsCursor className='icon' />
			</div>
		</div>

		<nav>
			<div className='icon-container'>
				<FontAwesomeIcon icon={faHome} />
				<BsSearch />
				<BsPlusSquare />
				<BsHeart />
				<img src={profile} className='profile' alt='doge' loading={`lazy`} />
			</div>
		</nav>
	</div>
);


const GetDogsPicture = () => {
	const [ urlPicture, setUrlPicture ] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get('https://api.thedogapi.com/v1/images/search?limit=100&breed_id=222');
				const data = response.data;
				setUrlPicture(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const GetMappedPictures = () => {
		return(
			<div>
				{
					urlPicture.map((src,i) => {
						const name = dogName();
						return(
							<div className='hero' key={i}>
								<div className='name-container'>
									<div className='profile-container'>
										<div className='left'>
											<img src={src.url} alt={`doggo${i}`} height={`auto`} width={`100%`} loading={`lazy`} />
											<span>{name}</span>
										</div>
										<div className='right'>
											<FontAwesomeIcon icon={faEllipsisV} />
										</div>
									</div>
								</div>
								<img src={src.url} alt={`doggo${i}`} height={`auto`} width={`100%`} loading={`lazy`} />
								<div className='icons'>
									<div className='left'>
										<BsHeart className='icon' />
										<BsChat className='icon' />
										<BsCursor className='icon' />
									</div>
									<div className='right'>
										<BsBookmark className='icon' />
									</div>
								</div>
								<div className='caption-container'>
									{dogName(name)}
									<CaptionQuote />
								</div>
							</div>
						);
					})
				}
		</div>
		);
	}

	return <GetMappedPictures />;
};

const dogName = (prevName) => {
	if(prevName) {
		return <b className='name'>{prevName}</b>;
	} else {
		let name = dogNames.allRandom();
		let arr = name.split('');
		let vowels = 'aeiouAEIOU';
	
		for (let i in name) {
			if (vowels.indexOf(arr[i]) > -1) {
				i++;
				arr.splice(i, 0, 'm');
				arr.join('');
				return <b className='name'>{arr.join('')}</b>;
			}
		}
	}
};

const CaptionQuote = () => {
	return <span className='caption'>{movieQuote.getRandomQuote()}</span>;
};

/* Footer */

const Footer = () => (
	<footer></footer>
);

export default App;
