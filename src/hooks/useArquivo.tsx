import React, { useState, useEffect, useContext, createContext } from "react";
import {
  ArquivosProps,
  ArquivosData,
  ArquivosProviderProps,
} from "../views/arquivos/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type ArquivoContextData = {
  arquivo: ArquivosProps[];
  createArquivo: (data: ArquivosData) => Promise<void>;
  deleteArquivo: ({ ID_ARQUIVO }: ArquivosProps) => Promise<void>;
  updateArquivo: (data: ArquivosProps) => Promise<void>;
};

const ArquivoContext = createContext<ArquivoContextData>(
  {} as ArquivoContextData
);

export function ArquivosProvider({ children }: ArquivosProviderProps) {
  const [arquivo, setArquivo] = useState<ArquivosProps[]>([]);

  useEffect(() => {
    try {
      api.get("/produto/arquivo").then((response) => setArquivo(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createArquivo(data: ArquivosData) {
    const result = await api.post("/produto/arquivo", data);
    Swal.fire("Parabéns!", "Curso Cadastrado Com Sucesso", "success");
    setArquivo([...arquivo, result.data]);
    api.get("/produto/arquivo").then((response) => setArquivo(response.data));
    console.log(result.data);
  }

  async function deleteArquivo(params: any) {
    try {
      const ID_ARQUIVO = params?.ID_ARQUIVO;
      const result = await api.get(`/produto/arquivo/delete/${ID_ARQUIVO}`);
      Swal.fire("Deletado!", "Curso excluído com sucesso.", "success");
      const response = arquivo.filter((data) => data.ID_ARQUIVO !== ID_ARQUIVO);
      setArquivo(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  async function updateArquivo(data: ArquivosProps) {
    const result = await api.put("/produto/arquivo", data);
    Swal.fire("Parabéns!", "Curso Editado Com Sucesso", "success");
    setArquivo([...arquivo, result.data]);
    api
      .get("/produto/moduloaula/aulas")
      .then((response) => setArquivo(response.data));
    console.log(result.data);
  }

  return (
    <ArquivoContext.Provider
      value={{ arquivo, createArquivo, deleteArquivo, updateArquivo }}
    >
      {children}
    </ArquivoContext.Provider>
  );
}

export function useArquivo() {
  const context = useContext(ArquivoContext);
  return context;
}
