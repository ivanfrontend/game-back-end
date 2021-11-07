const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playingFieldCellSchema  = new Schema({
    idRoom: {
        type: mongoose.Schema.ObjectId,
        ref: "GameRoom",
        required: true
    },
    result: Number,
})

module.exports = mongoose.model("PlayingFieldCell", playingFieldCellSchema);