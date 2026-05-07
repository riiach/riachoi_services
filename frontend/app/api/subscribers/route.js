import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { subscriberSchema } from "@/lib/validations/validations.js";
import { sendWelcomeEmail } from "@/lib/service/email-service";

export async function POST(request) {
  try {
    // Reads JSON body from request
    const body = await request.json();

    // Validates request body with Zod
    const result = subscriberSchema.safeParse(body);

    // Returns 400 when validation fails
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    // Gets validated data from safeParse result
    const validatedData = result.data;

    // Checks duplicate subscriber by email
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    // Returns 400 if email already exists
    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already subscribed",
        },
        { status: 400 }
      );
    }

    // Creates new subscriber in database
    const subscriber = await prisma.subscriber.create({
      data: {
        email: validatedData.email,
        name: validatedData.name ?? null,
      },
    });

    // Sends welcome email, but does not fail subscription if email fails
    try {
      await sendWelcomeEmail({
        to: subscriber.email,
      });
    } catch (emailError) {
      console.error("WELCOME EMAIL ERROR:", emailError);
    }

    // Returns success response
    return NextResponse.json(
      {
        success: true,
        message: "Subscriber created successfully",
        data: subscriber,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handles unexpected server errors
    console.error("SUBSCRIBER CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create subscriber",
      },
      { status: 500 }
    );
  }
}