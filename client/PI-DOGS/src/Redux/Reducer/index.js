import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// order: {
// 		type: "ALPHABETIC | WEIGHT"
// 		direction: "ASC | DESC"
// 	}
// source: "ALL | API | DB"

const defaultOrder = {
	ALPHABETIC: "ASC",
}

const initialState = {
	list: [],
	filtered: [],
	order: defaultOrder,
	source: "ALL",
	selectedTemperament: "0",
	currentPage: 1,
	detail: {},
	loading: true,
	status: "",
	searchName: "",
}

const dogSlice = createSlice({
	name: "dogs",
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload
		},
		setStatus(state, action) {
			state.status = action.payload
			state.loading = false
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setAllDogs(state, action) {
			state.list = action.payload
			state.filtered = action.payload
			state.order = defaultOrder
			state.currentPage = 1
			state.detail = {}
			state.loading = false
		},
		clearDogs() {
			return {
				...initialState,
			}
		},
		setDetail(state, action) {
			state.detail = action.payload
			state.loading = false
			state.status = ""
		},
		clearDetail(state) {
			state.detail = {}
			state.status = ""
		},
		setSelectedTemperament(state, action) {
			state.selectedTemperament = action.payload
		},
		setSource(state, action) {
			state.source = action.payload
		},
		setOrder(state, action) {
			state.order = action.payload
		},
		setSearchName(state, action) {
			state.searchName = action.payload
		},

		applyFilters(state) {
			// apply all filters - payload = all dogs
			let filtered = state.list
			// apply filter by source
			filtered =
				state.source === "ALL"
					? filtered
					: filtered.filter((f) => f.source === state.source)
			// apply filter by temperament
			filtered =
				state.selectedTemperament === "0"
					? filtered
					: filtered.filter((d) =>
							d.temperament.includes(state.selectedTemperament)
	)

			state.filtered = filtered
			state.loading = false
			state.currentPage = 1
		},

		applyOrder(state) {
			let sortedArr = []
			if (state.order.ALPHABETIC) {
				sortedArr =
					state.order.ALPHABETIC === "ASC"
						? [...state.filtered].sort((a, b) =>
								a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
	)
						: [...state.filtered].sort((a, b) =>
								b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1
	)
			} else {
				sortedArr =
					state.order.WEIGHT === "ASC"
						? [...state.filtered].sort((a, b) =>
								a.weightMin > b.weightMin ? 1 : -1
	)
						: [...state.filtered].sort((a, b) =>
								b.weightMin > a.weightMin ? 1 : -1
	)
			}
			return {
				...state,
				filtered: sortedArr,
				currentPage: 1,
			}
		},
	},
})

export const getByOrden = (order) => {
	return (dispatch) => {
		try {
			dispatch(setOrder(order))
			dispatch(applyOrder())
		} catch (error) {
			console.error("getByOrden:", error.message)
		}
	}
}

// filter by Source
export const getBySource = (source) => {
	return (dispatch) => {
		try {
			dispatch(setSource(source))
			dispatch(applyFilters())
			dispatch(applyOrder())
			dispatch(setStatus(""))
		} catch (error) {
			console.error("getBySource:", error.message)
			dispatch(setStatus(error.message))
		}
	}
}

// filter by Temperament
export const getByTemperament = (selected) => {
	return (dispatch) => {
		try {
			dispatch(setSelectedTemperament(selected))
			dispatch(applyFilters())
			dispatch(applyOrder())
			dispatch(setStatus(""))
		} catch (error) {
			console.error("getByTemperament:", error.message)
			dispatch(setStatus(error.message))
		}
	}
}
// load all dogs from API and database
export const fetchAllDogs = () => {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true))
			const { data } = await axios.get("/dogs")
			dispatch(setAllDogs(data))
		} catch (error) {
			console.error("fetchAllDogs:", error)
			dispatch(setStatus(error.message))
		}
	}
}
// search by name
export const searchByName = (name) => {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true))
			dispatch(setSearchName(name))
			const { data } = await axios.get(`/dogs?name=${name}`)
			dispatch(setAllDogs(data))
			if (data.length) {
				dispatch(applyFilters(data))
			} else {
				dispatch(setStatus("NOTFOUND"))
			}
		} catch (error) {
			console.error("searchByName: ", error.message)
			dispatch(setStatus(error.message))
		}
	}
}
// search by Id and fill detail
export const searchById = (id) => {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true))
			const { data } = await axios.get(`/dogs/${id}`)
			if (data) {
				dispatch(setDetail(data))
			} else {
				dispatch(setStatus("NOTFOUND"))
			}
		} catch (error) {
			console.error("searchById:", error.message)
			dispatch(setStatus(error.response ? error.response.data : error.message))
		}
	}
}
// create new breed
export const postNewBreed = (formData) => {
	return async (dispatch) => {
		try {
			const { data: dogCreated } = await axios.post("/dogs", formData)
			const { data } = await axios.get("/dogs")
			dispatch(setAllDogs(data))
			dispatch(applyFilters())
			dispatch(applyOrder())
			dispatch(setStatus("OK"))
			return dogCreated
		} catch (error) {
			// catch unique error.
			const message = error.response
				? error.response.data.includes("dogs_name_key")
					? `The name "${formData.name}" already exists!`
					: error.response.data
				: error.message
			dispatch(setStatus(message))
			console.error("postNewBreed:", error)
		}
	}
}
// delete from database
export const deleteBreed = (id) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/dogs/${id}`)
			dispatch(setStatus("OK"))
			const { data } = await axios.get("/dogs")
			dispatch(setAllDogs(data))
			dispatch(applyFilters())
		} catch (error) {
			dispatch(setStatus(error.message))
			console.error("deleteBreed:", error.message)
		}
	}
}

export const {
	setLoading,
	setStatus,
	setCurrentPage,
	setAllDogs,
	clearDogs,
	setDetail,
	clearDetail,
	setSelectedTemperament,
	setSource,
	setOrder,
	setSearchName,
	applyFilters,
	applyOrder,
} = dogSlice.actions

export default dogSlice.reducer
