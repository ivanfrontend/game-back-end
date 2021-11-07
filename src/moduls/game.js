const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
    quantityCells: Number,
    quantityActiveCells: Number,
})


module.exports = mongoose.model("GameRoom", gameRoomSchema);
