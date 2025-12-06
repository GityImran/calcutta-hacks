import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
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

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log(`Generated OTP for ${email}: ${otp}`);

    await User.updateOne(
      { _id: user._id },
      { verificationOtp: otp, otpExpiresAt }
    );

    console.log(`Updated OTP in DB for ${email}`);

    // Send email with OTP
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Email Verification - Your OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B3B3B;">Email Verification</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #F7EFE0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #C58B2C; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #7B5A3C;">This code will expire in 10 minutes.</p>
          <p style="color: #7B5A3C; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return NextResponse.json(
        { message: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
