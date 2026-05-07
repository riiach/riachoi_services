import * as React from "react";

export function AdminEstimateNotificationEmail({
  name,
  email,
  selectedFeatures,
  subtotal,
  total,
}) {
  return (
    <div>
      <h1>New Estimate Request</h1>

      <p>Name: {name || "No name provided"}</p>
      <p>Email: {email}</p>

      <h2>Selected Features</h2>

      <ul>
        {selectedFeatures.map((feature) => (
          <li key={feature.featureId}>
            {feature.name} x {feature.quantity} = ${feature.calculatedPrice}
          </li>
        ))}
      </ul>

      <p>Subtotal: ${subtotal}</p>
      <p>Total: ${total}</p>
    </div>
  );
}