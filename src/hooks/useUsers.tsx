import React, { useState, useEffect, useContext, createContext } from "react";
import {
  NewAccountProviderProps,
  NewAccountProps,
  NewAccountEditProps,
  NewAccountData,
} from "../views/users/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type NewAccountContextData = {
  user: NewAccountProps[];
  createUser: (data: NewAccountData) => Promise<void>;
  updateUser: (data: NewAccountEditProps) => Promise<void>;
};

const UsersContext = createContext<NewAccountContextData>(
  {} as NewAccountContextData
);

export function UsersProvider({ children }: NewAccountProviderProps) {
  const [user, setUser] = useState<NewAccountProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/seguranca/usuarioall")
        .then((response) => setUser(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);
  async function createUser(data: NewAccountData) {
    const result = await api.post("/seguranca/usuario", data);
    Swal.fire("Parabéns!", "Curso Cadastrado Com Sucesso", "success");
    setUser([...user, result.data]);
    api.get("/seguranca/usuarioall").then((response) => setUser(response.data));
    console.log(result.data);
  }

  async function updateUser(data: NewAccountEditProps) {
    const result = await api.put("/seguranca/usuario", data);
    Swal.fire("Parabéns!", "Dados do Usuário Editados Com Sucesso", "success");
    setUser([...user, result.data]);
    api.get("/seguranca/usuarioall").then((response) => setUser(response.data));
    console.log(result.data);
  }

  return (
    <UsersContext.Provider value={{ user, createUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UsersContext);
  return context;
}
