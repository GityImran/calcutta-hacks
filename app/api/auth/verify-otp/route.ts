import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }

    if (!user.verificationOtp) {
      return NextResponse.json(
        { message: "No OTP found. Please request a new one." },
        { status: 400 }
      );
    }

    // Convert both to strings and trim whitespace for comparison
    const storedOtp = String(user.verificationOtp).trim();
    const providedOtp = String(otp).trim();

    if (storedOtp !== providedOtp) {
      console.log(`OTP mismatch - Stored: "${storedOtp}", Provided: "${providedOtp}"`);
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      );
    }

    // Mark email as verified
    await User.updateOne(
      { _id: user._id },
      { emailVerified: true, verificationOtp: null, otpExpiresAt: null }
    );

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
