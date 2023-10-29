import React from "react";
import styles from "../Landing/Landing.module.css";
import { useState } from "react"

function LandingContainer() {
	const [ruta, setRuta] = useState("/")
	const handleClick = () => {
		setRuta("/breeds")
	}
    return (
        <div className={`${styles.LandingContainer}`}>
            <div className={`${styles.Intro}`}>
            <h1>Welcome to Dog's World</h1>
            <div className={`${styles.LaunchBottom}`}  onClick={handleClick}>
						<span>START</span>
					</div>
					</div>
            </div>
    )}

    export default LandingContainer;