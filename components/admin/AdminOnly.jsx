import React from "react";
import { useSeletor } from "@reduxjs/toolkit";

export const AdminOnly = props => {
    const admin = useSeletor();

    return admin ? props.children : null;
};
