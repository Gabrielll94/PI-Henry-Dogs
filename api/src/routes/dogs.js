const { Router } = require("express")
const {
	getAllData,
	getByIdRaza,
	addNewBreed,
	deleteDbBreed,
} = require("../controllers/dogs")

const server = Router()

//  GET /dogs
//  GET /dogs?name="..."
server.get("/", async (req, res, next) => {
	try {
		const { name } = req.query
        const dogsData = await getAllData(name)
		res.status(200).send(dogsData)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

// GET /dogs/{idRaza}
server.get("/:idRaza", async (req, res) => {
	try {
		const { idRaza } = req.params
        const dogsData = await getByIdRaza(idRaza)
		res.status(200).send(dogsData)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

// POST /dogs
server.post("/", async (req, res) => {
	try {
		const { name, heightMin, heightMax, weightMin, weightMax } = req.body
		if (!name || !heightMin || !heightMax || !weightMin || !weightMax ) {
			res.status(400).send("Must complete all required fields")
		} else {
			const response = await addNewBreed(req.body)
			res.status(200).send(response)
		}
	} catch (error) {
		res.status(400).send(error.message)
	}
})
// DELETE /dogs
server.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
        await deleteDbBreed(id)
        res.sendStatus(200)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

module.exports = server
