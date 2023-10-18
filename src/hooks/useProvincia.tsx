import React, { useState, useEffect, useContext, createContext } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type ProvinciaProps = {
  id: number;
  designacao: string;
};

type ProvinciaProviderProps = {
  children: React.ReactNode;
};

type ProvinciaContextData = {
  provincia: ProvinciaProps[];
};

const ProvinciaContext = createContext<ProvinciaContextData>(
  {} as ProvinciaContextData
);

export function ProvinciaProvider({ children }: ProvinciaProviderProps) {
  const [provincia, setProvincia] = useState<ProvinciaProps[]>([]);

  useEffect(() => {
    try {
      api.get("/provinciaAll").then((response) => setProvincia(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <ProvinciaContext.Provider value={{ provincia }}>
      {children}
    </ProvinciaContext.Provider>
  );
}

export function useProvincia() {
  const context = useContext(ProvinciaContext);
  return context;
}
