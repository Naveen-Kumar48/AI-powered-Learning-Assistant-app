import mooongose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mooongose.Schema({
  username: {
    type: String,
    required: [true, 'please privide ausername'],
    unique: true,
    trim: true,
    minlength: [3, 'username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [6, "password must be at least 6 characters long"],
    select: false,
  },
  profileImage: {
    type: String,
    default: null
  },

}, { timestamps: true });

//*Hashing  password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


//compare password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
const User = mooongose.model('User', UserSchema);
export default User;