import { NextResponse } from "next/server";
import { editAccountSchema } from "@/lib/schemas";
import { auth } from "@/auth";
import Account from "@/models/Account";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          resData: {},
          success: false,
          code: 0,
          message: "Unauthorized access",
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    const rawData = await req.json();
    const parsed = await editAccountSchema.safeParseAsync(rawData);

    if (!parsed.success) {
      return NextResponse.json(
        {
          resData: parsed.error.flatten(),
          success: false,
          code: 0,
          message: "Invalid input",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { _id, ...updateData } = parsed.data;

    const response = await Account.findOneAndUpdate(
      { _id, userId: session.user._id },
      updateData,
      { new: true }
    );

    if (!response) {
      return NextResponse.json(
        {
          resData: {},
          success: false,
          code: 0,
          message: "Account not found or update failed",
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        resData: {},
        success: true,
        code: 10,
        message: "Account updated successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      {
        resData: {},
        success: false,
        code: 0,
        message: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
