import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';

const userschema = new Schema(
    {
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  Fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
  avatar:{
    type:String, //cloudinary url
    required:true,
  },
  converImage:{
  type:String
  },
  watchHistory:[
    {
        type:Schema.type.objectId,
        ref:"Video"
    },
  ],
  password:{
    type:String,
    required:[true,"password is required"]
  },
  refreshToken:{
    type:String
  },

},{timestamps:true})

userSchema.pre("save", async function(next){
  if(!this.isModified("password"))return next();
  this.password = bcrypt.hash(this.password, 10)
  next()
} )

userSchema.methods.ispasswordcorrect = async function(password){
  return await  bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    return JsonWebToken.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    Fullname:this.Fullname
    
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
     expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.generateRefreshToken = function(){
  jsonwebtoken.sign({
    _id:this._id,
    

  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:REFRESH_TOKEN_EXPIRY
  }
)
}


export const User = mongoose.model("User",userschema)