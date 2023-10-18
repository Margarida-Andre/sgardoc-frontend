import React, { useState, useEffect, useContext, createContext } from "react";
import { NewAccountProviderProps, NewAccountProps } from "../views/users/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type CursoContextData = {
  menu: NewAccountProps[];
};

const MenuContext = createContext<CursoContextData>({} as CursoContextData);

export function MenuProvider({ children }: NewAccountProviderProps) {
  const [menu, setMenu] = useState<NewAccountProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/seguranca/menuprincipal")
        .then((response) => setMenu(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <MenuContext.Provider value={{ menu }}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  return context;
}
