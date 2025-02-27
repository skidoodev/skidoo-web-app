"use server"
import { env } from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const sendTravelFormEmail = async (formData: any) => {
  const { destination, adults, children, pets, seniors, description, startDate, endDate, travelerTypes, email } = formData;

  try {
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
              <div class="contact-email">${email}</div>
            </div>
            
            <div class="section">
              <div><span class="label">Destination:</span><span class="value">${destination}</span></div>
              <div><span class="label">Travel Dates:</span><span class="value">${formatDate(startDate)} - ${formatDate(endDate)}</span></div>
            </div>

            <div class="section">
              <div><span class="label">Travelers:</span></div>
              <div><span class="label">• Adults:</span><span class="value">${adults}</span></div>
              <div><span class="label">• Children:</span><span class="value">${children}</span></div>
              <div><span class="label">• Seniors:</span><span class="value">${seniors}</span></div>
              <div><span class="label">• Pets:</span><span class="value">${pets}</span></div>
              <div><span class="label">• Types:</span><span class="value">${travelerTypes.join(", ")}</span></div>
            </div>

            <div class="section">
              <div class="label">Trip Description:</div>
              <div class="description">${description}</div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};