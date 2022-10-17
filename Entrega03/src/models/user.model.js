import mongoose from 'mongoose';
import {  hash, unhash } from './utils/bcrypt.util.js';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

UserSchema.methods.encryptPassword = async password => {
  return await hash(password);
}

UserSchema.methods.checkPassword = async function (password) {
  return await unhash(password, this.password);
}

const userModel = mongoose.model('userModel', UserSchema, 'users');

export default userModel;