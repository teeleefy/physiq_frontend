/** Context: provides currentUser object and setter for it throughout app. */
import React from "react";

const FamilyContext = React.createContext();
const MemberContext = React.createContext();

export {
    FamilyContext, 
    MemberContext
};
