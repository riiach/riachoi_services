"use client"

import React from 'react'
import Image from 'next/image'

const ServicesCard = ({ allServices, selectedService, serviceDetails }) => {
    const webServices = serviceDetails.filter((service) => service.name === "Web");
    const devOpsServices = serviceDetails.filter((service) => service.name === "DevOps");
    const maintenanceServices = serviceDetails.filter((service) => service.name === "Maintenance");
    const additionalServices = serviceDetails.filter((service) => service.name === "Additional");

    return (
      <div className="grid h-screen lg:h-[60vh] w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {selectedService === "web" &&
          webServices.map((service, index) => (
            <div key={index} className="h-full w-full rounded-2xl bg-primary p-2 relative group">
              <div className="w-full h-full rounded-xl relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.description}
                  fill
                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute w-full h-full bg-black opacity-30 rounded-xl">

                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start justify-end p-6 absolute bottom-0 left-0 lg:gap-2">
                <h1 className="text-white z-20 text-lg lg:text-2xl font-semibold leading-tight">
                  {service.description}
                </h1>
                <p className="text-white font-plex font-semibold">{service.koreanDescription}</p>
              </div>
            </div>
          ))}

        {selectedService === "devops" &&
          devOpsServices.map((service, index) => (
            <div key={index} className="h-full w-full rounded-2xl bg-primary p-2 relative group">
              <div className="w-full h-full rounded-xl relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.description}
                  fill
                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute w-full h-full bg-black opacity-30 rounded-xl">

                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start justify-end p-6 absolute bottom-0 left-0 lg:gap-2">
                <h1 className="text-white z-20 text-lg lg:text-2xl font-semibold leading-tight">
                  {service.description}
                </h1>
                <p className="text-white font-plex font-semibold">{service.koreanDescription}</p>
              </div>
            </div>
          ))}

        {selectedService === "maintenance" &&
          maintenanceServices.map((service, index) => (
            <div key={index} className="h-full w-full rounded-2xl bg-primary p-2 relative group">
              <div className="w-full h-full rounded-xl relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.description}
                  fill
                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute w-full h-full bg-black opacity-30 rounded-xl">

                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start justify-end p-6 absolute bottom-0 left-0 lg:gap-2">
                <h1 className="text-white z-20 text-lg lg:text-2xl font-semibold leading-tight">
                  {service.description}
                </h1>
                <p className="text-white font-plex font-semibold">{service.koreanDescription}</p>
              </div>
            </div>
          ))}

        {selectedService === "additional" &&
          additionalServices.map((service, index) => (
            <div key={index} className="h-full w-full rounded-2xl bg-primary p-2 relative group">
              <div className="w-full h-full rounded-xl relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.description}
                  fill
                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute w-full h-full bg-black opacity-30 rounded-xl">

                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start justify-end p-6 absolute bottom-0 left-0 lg:gap-2">
                <h1 className="text-white z-20 text-lg lg:text-2xl font-semibold leading-tight">
                  {service.description}
                </h1>
                <p className="text-white font-plex font-semibold">{service.koreanDescription}</p>
              </div>
            </div>
          ))}
      </div>
    );
}
export default ServicesCard
