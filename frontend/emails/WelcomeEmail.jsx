import * as React from "react";

export function WelcomeEmail({ email }) {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Hi {email},</p>
      <p>Thank you for subscribing to Ria Choi Blog.</p>
      <p>I’ll keep you updated with new posts, projects, and announcements.</p>
    </div>
  );
}