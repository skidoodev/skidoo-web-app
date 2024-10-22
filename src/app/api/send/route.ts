
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendTravelFormEmail = async (formData: any) => {
//   const { destination, adults, children, pets, seniors, description, startDate, endDate, travelerTypes, email } = formData;

//   try {
//     const response = await resend.emails.send({
//       from: "onboarding@theskidoo.com",
//       to: "hello@theskidoo.com",
//       subject: "New Travel Form Submission",
//       html: `
//         <h1>New Travel Form Submission</h1>
//         <h3><strong>Contact Email:</strong> ${email}</h3>
//         <h5><strong>Destination:</strong> ${destination}</h5>
//         <p><strong>Adults:</strong> ${adults}</p>
//         <p><strong>Children:</strong> ${children}</p>
//         <p><strong>Pets:</strong> ${pets}</p>
//         <p><strong>Seniors:</strong> ${seniors}</p>
//         <p><strong>Description:</strong> ${description}</p>
//         <h5><strong>Start Date:</strong> ${startDate}</h5>
//         <h5><strong>End Date:</strong> ${endDate}</h5>
//         <h5><strong>Traveler Types:</strong> ${travelerTypes.join(", ")}</h5>
//       `,
//     });

//     console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };