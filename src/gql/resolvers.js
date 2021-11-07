const GameRoom = require("../moduls/game");
const PlayingFieldCell = require("../moduls/playingFieldCell");
const GetAllPlayingFields = require("../init/helpers/getAllPlayingFields");
const GetRandomValue = require("../init/helpers/getRandomValue");

const resolvers = {
    Query: {
      getAllRoom: () => {
        return GameRoom.find({}).then((res => {
            return res
        }))
      },
      getAllFieldsRoom: (root, { idx }) => {
        return PlayingFieldCell.find({idRoom: idx}).then((res => {
            return res
        }))
      },
    },
    Mutation: {
        createRoom: async() => {
            const gameRoom = new GameRoom({quantityCells: 50, quantityActiveCells: 0});
            const room = await gameRoom.save();
            const getAllFields = new GetAllPlayingFields(room._id);
            const playingFields = await PlayingFieldCell.insertMany(getAllFields.getFields())
            return {
                roomId: room._id,
                playingFields
            }

          },
          deleteRoom: async (root, { idx }) => {
            await PlayingFieldCell.deleteMany({idRoom: idx})
            return await GameRoom.deleteOne({_id: idx})
          },
          updateGameCell: async (root, { id }) => {
            const randomValue = new GetRandomValue();
            const cell = await PlayingFieldCell.findByIdAndUpdate({_id : id}, {$set: {result : randomValue.getNumber()}});
            const gameRoom = await GameRoom.findOne({_id: cell.idRoom});
             await GameRoom.findByIdAndUpdate({_id : cell.idRoom}, {$set: {quantityActiveCells : gameRoom.quantityActiveCells + 1}});
            return cell;
          }
    }
  };
  
  module.exports = resolvers;
  