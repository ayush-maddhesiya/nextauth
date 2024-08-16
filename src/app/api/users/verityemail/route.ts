import User from '@/models/userModels'
import { connectDB } from '@/dbconfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server';


connectDB()

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json()
    const { token } = reqBody;

    const user = await User.findOne({ verifyEmail: token, verifyEmailExpiry: { $gt: Date.now() } })
    if (!user) {
      return NextResponse.json(
        { message: "user not found to verify" },
         { status: 401 })
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    })

  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }


}