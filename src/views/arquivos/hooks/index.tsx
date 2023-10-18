import React, { useState, useEffect, useContext, createContext } from "react";
import { ArquivosProps, ArquivosProviderProps } from "../type";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { api } from "../../../services/api";

type ArquivoContextData = {
  arquivo: ArquivosProps[];
  createArquivo: (data: ArquivosProps) => Promise<void>;
  deleteArquivo: (id: any) => Promise<void>;
  updateArquivo: (id: any) => Promise<void>;
};

const ArquivoContext = createContext<ArquivoContextData>(
  {} as ArquivoContextData
);

export function ArquivoProvider({ children }: ArquivosProviderProps) {
  const [arquivo, setArquivo] = useState<ArquivosProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function handleSubmitGet() {
      const result = await api.get("/produto/modulo");
      setArquivo(result.data);
    }
    handleSubmitGet();
  }, []);

  async function createArquivo(data: ArquivosProps) {
    const result = await api.post("/aula/modulo", {
      data,
    });
    Swal.fire("Cadastrado!", "Cadastro feito com sucesso.", "success");
    history.push("/modulo/list");
    console.log(result.data);
  }

  async function deleteArquivo(params: any) {
    const id = params?.id;
    const result = await api.delete<any>(`/aula/modulo/${id}`);
    console.log(result.data);
  }

  async function updateArquivo(id: any) {
    localStorage.setItems("dataId", id);
    history.push(`/aula/edit${id}`);
  }

  return (
    <ArquivoContext.Provider
      value={{ arquivo, createArquivo, deleteArquivo, updateArquivo }}
    >
      {children}
    </ArquivoContext.Provider>
  );
}

export function useNewAccount() {
  const context = useContext(ArquivoContext);
  return context;
}
