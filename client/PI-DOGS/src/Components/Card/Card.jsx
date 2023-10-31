import React from 'react'
import styles from '../Card/Card.module.css'
import { Link } from 'react-router-dom'

function Item({id,
    name,
	weightMin,
	weightMax,
    image,
    temperament,}) {
        // text for weight
	let weightTxt = " - - "
	if (weightMin && weightMax) {
		weightTxt = weightMin + " - " + weightMax + " Kg"
	} else {
		if ((weightMin && !weightMax) || (!weightMin && weightMax)) {
			weightTxt = (weightMin ? weightMin : weightMax) + " Kg"
		}
    }
    const placeholder = '/assets/placeholder_perro.png'
	return (
		<div className={`${styles.Card}`}>
			<Link to={`/detail/${id}`}>
				<div className='card'>
					<div className='card-header'>
						<img src={image ?? placeholder} alt={name} loading='lazy' />
					</div>
					<div className='card-body'>
						<h4>{name}</h4>
						<p>
							{temperament &&
								temperament
									.slice(0, 3)
									.map((t, i) => <span key={t}>{i === 2 ? t : t + ", "}</span>)}
						</p>
					</div>
					<div className='bottom'>
						<span>WEIGHT: {weightTxt}</span>
					</div>
				</div>
			</Link>
		</div>
	)
}

    

export default Item