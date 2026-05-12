"use client"

import React from "react";
import ServiceCategory from "../../components/ServiceCategory"
import ServicesCard from "../../components/card/ServicesCard";
import { useService } from "../../hooks/useService";

const Services = () => {
  const {
    selectedService,
    setSelectedService,
    allServices,
    serviceDetails
  } = useService();

  return (
    <section className="mb-12 mt-24 flex h-auto lg:h-[60vh] w-full flex-col items-center rounded-2xl p-2">
      <ServiceCategory allServices={allServices} selectedService={selectedService} setSelectedService={setSelectedService} />
      <ServicesCard allServices={allServices} selectedService={selectedService} serviceDetails={serviceDetails} />
    </section>
  );
};
export default Services;
