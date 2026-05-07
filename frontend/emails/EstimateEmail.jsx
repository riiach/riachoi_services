import * as React from "react";

export function EstimateEmail({ name, selectedFeatures, subtotal, total }) {
  return (
    <div>
      <h1>Your Estimate Request</h1>

      <p>Hi {name || "there"},</p>

      <p>Thank you for requesting an estimate. Here is your selected feature summary:</p>

      <ul>
        {selectedFeatures.map((feature) => (
          <li key={feature.featureId}>
            {feature.name} x {feature.quantity} = ${feature.calculatedPrice}
          </li>
        ))}
      </ul>

      <p>Subtotal: ${subtotal}</p>
      <p>Total: ${total}</p>

      <p>I’ll review your request and get back to you soon.</p>
    </div>
  );
}