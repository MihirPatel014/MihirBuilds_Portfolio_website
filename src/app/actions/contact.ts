'use server';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}) {
  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'https://forms.fillout.com/t/oau15jdzTvus';

  try {
    // Submit form data to configured endpoint (Fillout / Google Apps Script)
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (response.ok || response.status === 200 || response.status === 201) {
      return { success: true };
    }

    // Fallback: try form-urlencoded if JSON content-type returns non-200
    const fallbackResponse = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (fallbackResponse.ok) {
      return { success: true };
    }

    return { success: false, error: 'Submission failed. Please try again.' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Network error occurred while submitting.' };
  }
}
