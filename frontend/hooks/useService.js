"use client";

import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

export const useService = () => {
    // Get context value
    const context = useContext(ServiceContext);

    if (!context) {
        throw new Error(
            "useService must be used within ServiceProvider"
        );
    }

    return context;
};