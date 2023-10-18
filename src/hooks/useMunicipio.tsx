import React, { useState, useEffect, useContext, createContext } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type MunicipioProps = {
  id: number;
  designacao: string;
};

type MunicipioProviderProps = {
  children: React.ReactNode;
};

type MunicipioContextData = {
  municipio: MunicipioProps[];
};

const MunicipioContext = createContext<MunicipioContextData>(
  {} as MunicipioContextData
);

export function MunicipioProvider({ children }: MunicipioProviderProps) {
  const [municipio, setMunicipio] = useState<MunicipioProps[]>([]);

  useEffect(() => {
    try {
      api.get("/municipioAll").then((response) => setMunicipio(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <MunicipioContext.Provider value={{ municipio }}>
      {children}
    </MunicipioContext.Provider>
  );
}

export function useMunicipio() {
  const context = useContext(MunicipioContext);
  return context;
}
