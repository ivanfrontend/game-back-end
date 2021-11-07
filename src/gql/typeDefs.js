const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type RoomData {
    _id: ID
    quantityCells: Int!,
    quantityActiveCells: Int!,
  }


  type PlayingField {
    _id: ID!
    idRoom: ID!
    result: Int
  }

  type CreateRoomData {
    roomId: ID!
    playingFields: [PlayingField!]!
  }

  type Query {
    getAllRoom: [RoomData]!
    getAllFieldsRoom(idx: ID!): [PlayingField!]!
  }
  type Mutation {
    createRoom: CreateRoomData
    deleteRoom(idx: ID!): RoomData
    updateGameCell(id: ID!): PlayingField!
  }
`;

module.exports = typeDefs;
