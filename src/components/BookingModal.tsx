const handleSendEmail = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.fullName.trim() ||
    !formData.phoneNumber.trim() ||
    !formData.instagramId.trim() ||
    !formData.currentProblem.trim()
  ) {
    setErrorMessage(
      'Please fill in all required details before proceeding!'
    );
    return;
  }

  if (!isValidIndianPhone(formData.phoneNumber)) {
    setErrorMessage(
      'Invalid phone number! Please enter a valid 10-digit Indian mobile number (e.g., +91 98765 43210).'
    );
    return;
  }

  setErrorMessage(null);
  setIsSubmitting(true);

  const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbyyUmXiHTOFEWaxfQ2k36I6zlailBr4sxpQy1Q70QlUkI47MPeOow0BRZTsd_57G8b5/exec';

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  // Exact fields needed by your Google Sheet:
  // Timestamp | Lead Source | Name | Phone | Instagram ID | Help Needed
  const directPayload = {
    timestamp,
    leadSource: 'Website',
    name: formData.fullName,
    phone: formData.phoneNumber,
    instagramId: formData.instagramId,
    helpNeeded: formData.currentProblem,
  };

  /*
   * Send directly to Google Apps Script.
   *
   * IMPORTANT:
   * We deliberately DO NOT:
   * - call /api/book-strategy-session
   * - read response.json()
   * - check response.ok
   *
   * Your Google Sheet is already receiving the submission.
   */
  try {
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(directPayload),
    }).catch((err) => {
      console.error('Google Apps Script submission error:', err);
    });
  } catch (err) {
    console.error('Google Apps Script request error:', err);
  }

  /*
   * FORCE SUCCESS SCREEN.
   *
   * We don't wait for or parse the Apps Script response.
   */
  setLastSubmittedData({
    ...formData,
  });

  setFormData({
    fullName: '',
    phoneNumber: '',
    instagramId: '',
    currentProblem: '',
    email: '',
  });

  setIsSubmitting(false);
  setSubmitted(true);
};
