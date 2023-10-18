import React, { useState, useEffect, useContext, createContext } from "react";
import {
  CertificadoProps,
  CertificadoProviderProps,
} from "../views/certificados/type";
import { api } from "../services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

type CertificadoContextData = {
  certificado: CertificadoProps[];
};

const CertificadoContext = createContext<CertificadoContextData>(
  {} as CertificadoContextData
);

export function CertificadoProvider({ children }: CertificadoProviderProps) {
  const [certificado, setCertificado] = useState<CertificadoProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/produto/certificado")
        .then((response) => setCertificado(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <CertificadoContext.Provider value={{ certificado }}>
      {children}
    </CertificadoContext.Provider>
  );
}

export function useCertificado() {
  const context = useContext(CertificadoContext);
  return context;
}
