import * as React from "react";
import { Html, Body, Container, Heading, Text, Img } from "@react-email/components";

export function WelcomeEmail({ email }) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "32px", textAlign: "center" }}>

          <Img
            src="https://i.ibb.co/vxPBLGJ8/kitten-no-boxes.gif"
            width="180"
            height="180"
            alt="Pink pixel cat playing with hearts"
            style={{
              margin: "0 auto 24px",
              borderRadius: "24px",
              display: "block",
            }}
          />

          <Heading style={{ color: "#111111" }}>
            Welcome!
          </Heading>

          <Text style={{ color: "#333333", fontSize: "16px" }}>
            Hi {email},
          </Text>

          <Text style={{ color: "#333333", fontSize: "16px" }}>
            Thank you for subscribing to Ria Choi Blog.
          </Text>

          <Text style={{ color: "#333333", fontSize: "16px" }}>
            I’ll keep you updated with new posts, projects, and announcements.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}