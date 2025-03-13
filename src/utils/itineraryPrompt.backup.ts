export const generateItineraryPrompt = (
  destination: string,
  duration: string,
  budget: string,
  travelStyle: string,
  preferences: string
) => {
  return `
You are an expert travel planner for TheSkidoo, a platform that helps students plan memorable trips. Create a detailed, day-by-day itinerary for a ${duration}-day trip to ${destination} with a ${budget} budget for a ${travelStyle}.

The itinerary should include:

1. A brief engaging introduction to ${destination} highlighting why it's worth visiting
2. A day-by-day breakdown with:
   - Morning, afternoon, and evening activities
   - Specific attractions with opening hours and approximate visit durations
   - Recommended local restaurants and cafes for meals
   - Transportation options between locations with estimated times and costs
   - Insider tips for each location

3. Accommodation recommendations suitable for ${travelStyle} travelers on a ${budget} budget
4. A budget breakdown table showing estimated costs for:
   - Accommodation
   - Food and drinks
   - Transportation
   - Activities and attractions
   - Miscellaneous expenses
   - Total estimated cost

5. Seasonal considerations for visiting ${destination}
6. A packing guide specific to ${destination} and the activities planned

Additional preferences to incorporate: ${preferences}

Format the itinerary in a clean, readable structure with clear headings, bullet points where appropriate, and emojis to highlight key attractions. Keep the tone friendly, informative, and tailored for students looking for memorable experiences.

Use markdown formatting for the response to ensure proper structure and readability.
`;
};