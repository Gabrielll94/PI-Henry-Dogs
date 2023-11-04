const { DataTypes } = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("dog", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
            allowNull: false,
            unique: 'nameIndex',
		},
		heightMin: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		heightMax: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weightMin: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weightMax: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lifeSpan: {
			field: "life_span",
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		bredFor: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	})
}