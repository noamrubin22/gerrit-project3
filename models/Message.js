const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  content: String,
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('User', messageSchema);
module.exports = Message;
