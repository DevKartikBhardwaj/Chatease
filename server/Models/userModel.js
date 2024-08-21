import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true,unique:true },
    password: { type: String, require: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save',async function(next){
  if(!this.isModified){
    next()
  }
  this.password = bcrypt.hashSync(this.password, 10);
})
const User=mongoose.model('User',userSchema);
export default User;