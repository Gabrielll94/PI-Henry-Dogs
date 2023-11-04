const validate = (field) => {
	let err = {}

	const msgRequired = "Required field"
	// Name
	if (!field.name) {
		err.name = msgRequired
	} else {
		err.name = field.name.length > 30 ? "Name too long (30 Max)" : ""
    }
    // bredfor
    err.bredFor = field.bredFor.length > 65 ? "Name too long (60 Max)" : ""

	// height and weight ar required and be number
	const msgNumber = "Must be number"
	err.weightMin = !field.weightMin
		? msgRequired
		: isNaN(field.weightMin)
		? msgNumber
		: ""
	err.weightMax = !field.weightMax
		? msgRequired
		: isNaN(field.weightMax)
		? msgNumber
		: ""
	err.heightMin = !field.heightMin
		? msgRequired
		: isNaN(field.heightMin)
		? msgNumber
		: ""
	err.heightMax = !field.heightMax
		? msgRequired
		: isNaN(field.heightMax)
		? msgNumber
		: ""

	// validate the range between MIN and MAX
	const msgRange = "Min must be lower than Max"
	if (
		field.weightMin &&
		field.weightMax &&
		err.weightMin === "" &&
		err.weightMax === ""
	) {
		err.weightMax =
			Number(field.weightMin) > Number(field.weightMax) ? msgRange : ""
	}
	if (
		field.heightMin &&
		field.heightMax &&
		err.heightMin === "" &&
		err.heightMax === ""
	) {
		err.heightMax =
			Number(field.heightMin) > Number(field.heightMax) ? msgRange : ""
	}
	if (field.lifeSpanMin && field.lifeSpanMax && err.lifeSpanMax === "") {
		err.lifeSpanMax =
			Number(field.lifeSpanMin) > Number(field.lifeSpanMax) ? msgRange : ""
	}

	// validate valid range between 1 -100
	const msgLimit = "Valid range: 1 "
	if (err.weightMin === "" && err.weightMax === "") {
		if (Number(field.weightMin) < 1 || Number(field.weightMax) > 100) {
			err.weightMax = msgLimit + "- 100"
		}
	}
	if (err.heightMin === "" && err.heightMax === "") {
		if (Number(field.heightMin) < 1 || Number(field.heightMax) > 100) {
			err.heightMax = msgLimit + "- 100"
		}
	}
	if ((!err.lifeSpanMax || err.lifeSpanMax === "") && field.lifeSpanMin && field.lifeSpanMax) {
		if (Number(field.lifeSpanMin) < 1 || Number(field.lifeSpanMax) > 20) {
			err.lifeSpanMax = msgLimit + "- 20"
		}
	}

	return err
}

export default validate