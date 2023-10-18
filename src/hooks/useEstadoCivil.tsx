import React, { useState, useEffect, useContext, createContext } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type EstadoCivilProps = {
  id: number;
  designacao: string;
};

type EstadoCivilProviderProps = {
  children: React.ReactNode;
};

type EstadoCivilContextData = {
  estadoCivil: EstadoCivilProps[];
};

const EstadoCivilContext = createContext<EstadoCivilContextData>(
  {} as EstadoCivilContextData
);

export function EstadoCivilProvider({ children }: EstadoCivilProviderProps) {
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivilProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/estadoCivilAll")
        .then((response) => setEstadoCivil(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <EstadoCivilContext.Provider value={{ estadoCivil }}>
      {children}
    </EstadoCivilContext.Provider>
  );
}

export function useEstadoCivil() {
  const context = useContext(EstadoCivilContext);
  return context;
}
