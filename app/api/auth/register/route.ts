import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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
    const { name, email, password, role, affiliation } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log(`Generated OTP for ${email}: ${otp}`);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ?? null,
      affiliation,
      emailVerified: false,
      verificationOtp: otp,
      otpExpiresAt,
    });

    console.log(`Stored OTP in DB: ${user.verificationOtp}`);

    // Send OTP email
    try {
      const emailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification - Your OTP",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3B3B3B;">Welcome to Calcutta Hacks!</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #F7EFE0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #C58B2C; letter-spacing: 5px; margin: 0;">${otp}</h1>
            </div>
            <p style="color: #7B5A3C;">This code will expire in 10 minutes.</p>
            <p style="color: #7B5A3C; font-size: 12px;">If you didn't create this account, please ignore this email.</p>
          </div>
        `,
      });
      if (emailResponse.error) {
        console.error("Failed to send OTP email:", emailResponse.error);
      }
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      // Continue even if email fails, user can request resend
    }

    return NextResponse.json(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role ?? null,
        affiliation: user.affiliation,
        emailVerified: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
