import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma.ts";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try{
        // findMany() - Prisma method to retrieve multiple rows from database
        const features = await prisma.feature.findMany({
            where: { // filter conditions
                isActive: true
            },
            orderBy: { // sort order
                createdAt: "asc",
            },
            select: { // select specific columns
                id: true,
                name: true,
                description: true,
                price: true,
                icon: true,
                category: true,
                estimatedDays: true,
                isActive: true,
                isPopular: true,
            }
        });

        // Return successful JSON response
        return NextResponse.json({
            success: true,
            data: features,
        });
    } catch (error) {

        // Log error for debugging
        console.error("GET /api/features error: ", error);

        // Return error response
        return NextResponse.json({
            success: false,
            error: "Failed to fetch features",
        },{ status: 500 });
    }
}