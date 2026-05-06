import { prisma } from "@/lib/prisma";
import {
    badRequest,
    created,
    serverError,
} from "@/lib/api-response";

import { subscriberSchema } from "@/lib/validations";

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

        return created({
            subscriber_id: subscriber.id,
            email: subscriber.email,
        });
    } catch (error) {
        console.error(error);

        return serverError();
    }
}