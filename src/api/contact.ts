export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "8829e2ae-87f9-4536-955f-5c8f0bd5daca",
      ...data,
    }),
  });

  return response.json();
}
