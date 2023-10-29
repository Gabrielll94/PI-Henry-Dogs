import React from "react"
import SearchForm from "./SearchForm"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import styles from "./NavBar.module.css"
//redux
import { clearDogs } from "../redux/dogSlice"
import { clearTemperaments } from "../redux/temperamentSlice"
import { useDispatch } from "react-redux"

function NavBar({ search }) {
	const dispatch = useDispatch()
	const handleLogOut = () => {
		dispatch(clearTemperaments())
		dispatch(clearDogs())
	}

	return (
		<Navigation>
			<Logo />

			{search && (
				<>
					<SearchForm />
					<NavLink to='/newBreed'>
						Create your Breed
					</NavLink>
				</>
			)}

			<NavLink to='/' onClick={handleLogOut}>
				Landing Page
			</NavLink>
		</Navigation>
	)
}

export default NavBar