import React from "react"
import styles from "ErrorMessage.module.css"

function ErrorMessage({ msg }) {
	return <div className={`${styles.Message}`}>{msg}</div>
}

export default ErrorMessage