import React from "react";
import styles from "../Landing/Landing.module.css";
import { useState } from "react"
import { Link } from "react-router-dom";

function LandingContainer() {
	const [ruta, setRuta] = useState("/")
	const handleClick = () => {
		setRuta("/breeds")
	}
    return (
        <div className={`${styles.LandingContainer}`}>
            <div className={`${styles.Intro}`}>
            <h1>Welcome to Dog's World</h1>
            <Link to="/home">
                <button className={`${styles.Home}`}  onClick={handleClick}>
						Home</button>
					</Link>
                    <Link to="/about">
                <button className={`${styles.AboutBottom}`}  onClick={handleClick}>
						About me</button>
					</Link>
					</div>
            </div>
    )}

    export default LandingContainer;