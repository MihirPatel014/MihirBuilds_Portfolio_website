'use server';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}) {
  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!SCRIPT_URL) {
    console.warn('No GOOGLE_SCRIPT_URL provided in environment. Mocking submission.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: 'Mock submission successful' };
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
        return { success: true };
    }
    return { success: false, error: 'Submission failed' };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: 'Network error occurred' };
  }
}
