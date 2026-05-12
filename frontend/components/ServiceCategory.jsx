"use client"

import React from "react";
import TagRound from "./ui/TagRound";

const ServiceCategory = ({allServices, selectedService, setSelectedService}) => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 mb-12">
      <h1
        className="text-4xl font-semibold"
      >
        Featured Services
      </h1>

      {/* ListCard */}
      <div className="w-full h-auto flex flex-row overflow-auto gap-4 flex-wrap">
        {allServices.map((service, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedService(service.toLowerCase())}
          >
            <TagRound
              tag={service}
              bg={selectedService === service.toLowerCase() ? "bg-accent" : "bg-primary"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ServiceCategory;
