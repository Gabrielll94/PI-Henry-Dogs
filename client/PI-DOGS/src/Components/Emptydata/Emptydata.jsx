import React from 'react'
import styles from "Emptydata.module.css"

function Emptydata() {
return (
<div className={`${styles.Empty}`}>
			<h3>There're no breeds with this id... </h3>
			<h2>Create your own!</h2>
			<img alt='looking...' src='/assets/emptydata.gif' />
		</div>
	)
}

export default Emptydata