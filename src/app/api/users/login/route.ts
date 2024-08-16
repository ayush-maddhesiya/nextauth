import User from '@/models/userModels'
import bcryptjs from 'bcrypt'
import jwt from "jsonwebtoken"
import { connectDB } from '@/dbconfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server';
import { stat } from 'fs';

connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
  
    const user = await User.findOne({ email })
    if (!email) {
      return NextResponse.json({ Message: "User not found ", }, { status: 401 })
    }
  
    const validPassword = await bcryptjs.compare(password, user.password)
  
    if (!validPassword) {
      return NextResponse.json({ Message: "User not found ", }, { status: 401 })
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
  
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    const response = NextResponse.json({
      message: "Login Successfully",
      success: true
    })
  
    response.cookies.set("token", token, {
      httpOnly: true
    })
  
    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 });
  }
}
