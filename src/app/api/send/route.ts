import { NextResponse } from 'next/server';
import { env } from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

interface TravelFormData {
  destination: string;
  startDate: number;
  endDate: number;
  adults: number;
  children: number;
  pets: number;
  seniors: number;
  travelerTypes: string[];
  description: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const formData: TravelFormData = await request.json();
    
    const response = await resend.emails.send({
      from: "onboarding@theskidoo.com",
      to: "hello@theskidoo.com",
      subject: "New Travel Form Submission",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .title {
                color: #2c3e50;
                margin: 0;
                font-size: 24px;
              }
              .contact-email {
                color: #3498db;
                font-size: 18px;
                margin-top: 5px;
              }
              .section {
                background-color: white;
                padding: 15px;
                margin-bottom: 15px;
                border: 1px solid #eee;
                border-radius: 6px;
              }
              .label {
                font-weight: bold;
                color: #7f8c8d;
                margin-right: 8px;
                font-size: 16px
              }
              .value {
                color: #2c3e50;
                font-size: 16px
              }
              .description {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 6px;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="title">New Travel Form Submission</h1>
              <div class="contact-email">${formData.email}</div>
            </div>
            
            <div class="section">
              <div><span class="label">Destination:</span><span class="value">${formData.destination}</span></div>
              <div><span class="label">Travel Dates:</span><span class="value">${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}</span></div>
            </div>

            <div class="section">
              <div><span class="label">Travelers:</span></div>
              <div><span class="label">• Adults:</span><span class="value">${formData.adults}</span></div>
              <div><span class="label">• Children:</span><span class="value">${formData.children}</span></div>
              <div><span class="label">• Seniors:</span><span class="value">${formData.seniors}</span></div>
              <div><span class="label">• Pets:</span><span class="value">${formData.pets}</span></div>
              <div><span class="label">• Types:</span><span class="value">${formData.travelerTypes.join(", ")}</span></div>
            </div>

            <div class="section">
              <div class="label">Trip Description:</div>
              <div class="description">${formData.description}</div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' }, 
      { status: 500 }
    );
  }
}