import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    badRequest,
    created,
    serverError,
} from "@/lib/util/api-response";

import { subscriberSchema } from "@/lib/validations/validations.js";
import { sendWelcomeEmail } from "../../../lib/service/email-service";

export async function POST(request) {
    try {
        const body = await request.json();

        // validation
        const validatedData =
            subscriberSchema.parse(body);

        // duplicate email check
        const existingSubscriber =
            await prisma.subscriber.findUnique({
                where: {
                    email: validatedData.email,
                },
            });

        if (existingSubscriber) {
            return badRequest(
                "Email already subscribed"
            );
        }

        // save subscriber
        const subscriber =
            await prisma.subscriber.create({
                data: {
                    email: validatedData.email,
                    name: validatedData.name,
                },
            });

        // send welcome email
        await sendWelcomeEmail({
          to: subscriber.email,
        })

        return NextResponse.json(
          {
            success: true,
            message: "Subscriber created successfully",
            data: subscriber,
          }, { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
          {
            success: false,
            error: "Failed to create subscriber",
          }, { status: 500 }
        )
    }
}