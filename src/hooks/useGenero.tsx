import React, { useState, useEffect, useContext, createContext } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type GeneroProps = {
  id: number;
  designacao: string;
};

type EstadoCivilProviderProps = {
  children: React.ReactNode;
};

type GeneroContextData = {
  genero: GeneroProps[];
};

const GeneroContext = createContext<GeneroContextData>({} as GeneroContextData);

export function GeneroProvider({ children }: EstadoCivilProviderProps) {
  const [genero, setGenero] = useState<GeneroProps[]>([]);

  useEffect(() => {
    try {
      api.get("/generoAll").then((response) => setGenero(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <GeneroContext.Provider value={{ genero }}>
      {children}
    </GeneroContext.Provider>
  );
}

export function useGenero() {
  const context = useContext(GeneroContext);
  return context;
}
