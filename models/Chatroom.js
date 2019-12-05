const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatroomSchema = new Schema({
  users:[String],
  location: [Number],
  messages: [{
    type:Schema.Types.ObjectId,
    ref: 'message'
  }],
  namespace: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = Chatroom;

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;