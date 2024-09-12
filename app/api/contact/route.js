// app/api/contact/route.js

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Process the form data here (e.g., save to database, send email, etc.)

    console.log('Form data received:', { name, email, message });

    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing form data:', error);
    return new Response(JSON.stringify({ message: 'Error submitting form' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
