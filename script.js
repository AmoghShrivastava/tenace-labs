const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", () => {
    const subjectInput = inquiryForm.querySelector('input[name="subject"]');
    const formSubject = inquiryForm.querySelector('input[name="_subject"]');
    const subject = subjectInput.value.trim();

    if (subject) {
      formSubject.value = `Tenace Labs inquiry: ${subject}`;
    }
  });
}
