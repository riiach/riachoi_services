import ContactForm from "../../components/forms/ContactForm";

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="flex h-full w-full flex-col rounded-2xl bg-background px-5 py-5 text-foreground">
      <h2 id="contact-heading" className="mb-5 text-lg font-medium">Send me a message</h2>
      <ContactForm />
    </section>
  );
}
