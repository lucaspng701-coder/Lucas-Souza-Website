import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Lucas Souza",
  description: "Start a motion, design or interactive project with Lucas Souza.",
};

export default function ContactPage() {
  return (
    <main className="inner-page contact-page grid-surface">
      <section className="contact-page-main section-pad">
        <div className="page-eyebrow">
          <span>Contact / Florianópolis, Brazil</span>
          <span>Available worldwide</span>
        </div>

        <div className="contact-page-copy">
          <p>Got an idea worth moving?</p>
          <h1>Say<br /><em>hello.</em></h1>
        </div>

        <div className="contact-page-links">
          <a href="mailto:lucassouzajr@gmail.com">
            <span>Email</span>
            <strong>lucassouzajr@gmail.com</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <a href="https://wa.me/5548999009117" target="_blank" rel="noreferrer">
            <span>WhatsApp</span>
            <strong>+55 48 99900-9117</strong>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>
    </main>
  );
}
