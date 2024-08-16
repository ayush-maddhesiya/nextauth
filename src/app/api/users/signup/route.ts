import User from '@/models/userModels'
import  bcryptjs  from 'bcrypt'
import { connectDB } from "@/dbconfig/dbConfig"
import { NextRequest, NextResponse } from 'next/server';

connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody
    console.log(reqBody);

    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    console.log("here",salt,hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    console.log("newUser : ",newUser);
    console.log("savedUser : ");
    console.log(process.env.MONGODB_URI);

    const savedUser = await newUser.save(); 
    console.log("savedUser : ",savedUser);
    
    return NextResponse.json({
      message: "User create successfully",
      success: true,
      user: savedUser
    })
  } catch (error:any) {
    console.error('Error: ', error);
    return NextResponse.json({
      message: error.message || "User creation not successful",
      success: false
    }, { status: 501 });
  }
}
