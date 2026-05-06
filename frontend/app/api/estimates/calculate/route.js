import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma.ts";

// Create request validation schema using Zod
const estimateSchema = z.object({
    items: z
    .array( // items must be an array
        z.object({ // Each item inside array must follow this schema
            featureId: z.string().min(1, "featureId is required"),
            quantity: z.number().int("quantity must be an integer").min(1, "quantity must be greater than 0"),
        })
    )

    .min(1, "At least one item is required"), // Ensures array contains at least one item
});

// POST API endpoint
export async function POST(request) {
    try{
        const body = await request.json();

        // Validate the request body using Zod
        const validatedData = estimateSchema.parse(body);

        // Extract feature IDs from validated data
        const featureIds = validatedData.items.map(item => item.featureId);

        // Retrieve multiple matching features from database
        const features = await prisma.feature.findMany({
            where: {
                id: {
                    in: featureIds,
                },
            },

            isActive: true,
        });

        // Check if all features are available
        if (features.length !== featureIds.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "One or more features are not available",
                }, { status: 400 }
            );
        }

        // Build calculated feature list
        const selectedFeatures = validatedData.items.map(item => {

            // Find the feature associated with the item
            const feature = features.find(
                (feature) => feature.id === item.featureId
            );

            // Calculate the total price for the item
            const calculatedPrice = feature.price * item.quantity;

            // Return the calculated feature
            return {
                featureId: item.featureId,
                name: feature.name,
                description: feature.description,
                unitPrice: feature.price,
                quantity: item.quantity,
                calculatedPrice,
            };
        });

        // Calculate the subtotal
        const subtotal = selectedFeatures.reduce(
            (sum, item) => sum + item.calculatedPrice,
            0
        );

        // Final total price
        const total = subtotal;

        // SUCCESS RESPONSE
        return NextResponse.json(
            {
                success: true,
                data: {
                    subtotal,
                    total,
                    selectedFeatures,
                },
            },
        )
    } catch (error) {
        console.error(
            "POST /api/estimates/calculate error: ",
            error
        );

        // Detect validation errors seperately
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.issues,
                }, { status: 400 }
            );
        }

        // Generic server error
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
            }, { status: 500 }
        );
    }
}
