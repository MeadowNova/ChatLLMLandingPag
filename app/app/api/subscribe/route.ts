
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const subscriberSchema = z.object({
  email: z.string().email("Valid email is required"),
  source: z.string().optional().default("landing_page_simplified"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = subscriberSchema.parse(body);

    // Create the subscriber
    await prisma.emailSubscriber.create({
      data: {
        email: validatedData.email,
        source: validatedData.source,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!"
    });
  } catch (error: any) {
    console.error("Subscription error:", error);

    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          error: "Invalid form data",
          errors: error.errors
        },
        { status: 400 }
      );
    }

    // Check if it's a unique constraint error (email already exists)
    if (error?.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed.",
          error: "This email is already subscribed."
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process subscription. Please try again.",
        error: "Failed to process subscription. Please try again."
      },
      { status: 500 }
    );
  }
}
