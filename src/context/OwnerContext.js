import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const OwnerContext = createContext({});

export function OwnerContextProvider({ children }) {
  const [owner, setOwner] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!owner) {
      const { data } = axios.get("/ownerProfile").then(({ data }) => {
        setOwner(data);
        setReady(true);
      });
    }
  });

  return (
    <OwnerContext.Provider value={{ owner, setOwner, ready }}>
      {" "}
      {children}
    </OwnerContext.Provider>
  );
}
