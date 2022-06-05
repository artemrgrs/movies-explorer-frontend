import React from 'react';
import './Portfolio.css';
import arrowIcon from '../../images/icon_arrow.svg';

function Portfolio() {
	return (
		<div className='portfolio'>
			<h4 className='portfolio__title'>Портфолио</h4>
			<ul className='portfolio__list'>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='#'>
						Статичный сайт
					</a>
					<a
						className='app__link'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='hhttps://izverk.github.io/how-to-learn/'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='#'>
						Адаптивный сайт
					</a>
					<a
						className='app__link portfolio__project-arrow'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='#'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='#'>
						Одностраничное приложение
					</a>
					<a
						className='app__link portfolio__project-arrow'
						href='#'
						rel='noreferrer'
						target='_blank'
						title='#'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Portfolio;
