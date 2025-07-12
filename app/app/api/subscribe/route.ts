
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

const subscriberSchema = z.object({
  email: z.string().email("Valid email is required"),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  experience: z.string().optional(),
  experienceLevel: z.enum(['COMPLETE_BEGINNER', 'SOME_AI_TECH_EXPERIENCE', 'EXPERIENCED_PROFESSIONAL']).optional(),
  interests: z.array(z.string()).optional(),
  source: z.string().optional().default("landing_page"),
  // Analytics fields
  referralSource: z.string().optional(),
  referralMedium: z.string().optional(),
  referralCampaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get client analytics data
    const headersList = headers()
    const ipAddress = headersList.get('x-forwarded-for') ||
                     headersList.get('x-real-ip') ||
                     request.ip ||
                     'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Validate the request body
    const validatedData = subscriberSchema.parse(body);

    // Parse name into firstName and lastName if provided
    let firstName = validatedData.firstName;
    let lastName = validatedData.lastName;

    if (validatedData.name && !firstName && !lastName) {
      const nameParts = validatedData.name.trim().split(' ');
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ') || undefined;
    }

    // Create the subscriber
    await prisma.waitlistSubscriber.create({
      data: {
        email: validatedData.email,
        firstName,
        lastName,
        company: validatedData.company,
        experienceLevel: validatedData.experienceLevel,
        source: validatedData.source,
        // Legacy fields for backward compatibility
        name: validatedData.name,
        experience: validatedData.experience,
        legacyInterests: validatedData.interests || [],
        // Analytics fields
        ipAddress: ipAddress.split(',')[0].trim(),
        userAgent,
        referralSource: validatedData.referralSource,
        referralMedium: validatedData.referralMedium,
        referralCampaign: validatedData.referralCampaign,
        // Default values for new fields
        segment: 'waitlist',
        emailConsent: true,
        marketingConsent: true,
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
