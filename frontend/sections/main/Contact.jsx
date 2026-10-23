import ContactForm from "../../components/forms/ContactForm";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 flex h-full w-full flex-col rounded-2xl bg-background px-5 py-5 text-foreground">
      <ContactForm />
    </section>
  );
}
