import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "mechanic"],
    default: "mechanic"
  },

  level: {
    type: String,
    enum: ["Expert", "Medium", "New Recruit", "Trainee"],
    default: null
  },

  picture: {
    type: String
  }

},
{ timestamps: true }
);



// 🔐 hash password before save
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// 🔐 compare password
userSchema.methods.comparePassword = function(pass) {
  return bcrypt.compare(pass, this.password);
};


export default mongoose.model("User", userSchema);
