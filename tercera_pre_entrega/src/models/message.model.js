import mongoose from 'mongoose';

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  message: { type: String, required: true },
}, {
    timestamps: true, 
}); 

// messageSchema.pre("find", function() {
//   this.populate("user")
// })
const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;