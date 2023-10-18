import React, { useState, useEffect, useContext, createContext } from "react";
import { MenuItemsProps, MenuItemsProviderProps } from "../type";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { api } from "../../../services/api";

type MenuItemsContextData = {
  items: MenuItemsProps[];
  createMenuItem: (data: MenuItemsProps) => Promise<void>;
  deleteMenuItem: (id: any) => Promise<void>;
  updateMenuItem: (id: any) => Promise<void>;
};

const MenuItemsContext = createContext<MenuItemsContextData>(
  {} as MenuItemsContextData
);

export function MenuItemsProvider({ children }: MenuItemsProviderProps) {
  const [items, setItems] = useState<MenuItemsProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function handleSubmitGet() {
      const result = await api.get("/menuprincipal");
      setItems(result.data);
    }
    handleSubmitGet();
  }, []);

  async function createMenuItem(data: MenuItemsProps) {
    const result = await api.post("/menuprincipal", {
      data,
    });
    Swal.fire("Cadastrado!", "Cadastro feito com sucesso.", "success");
    history.push("/menuItem/list");
    console.log(result.data);
  }

  async function deleteMenuItem(params: any) {
    const id = params?.id;
    const result = await api.delete<any>(`/menuprincipal/${id}`);
    console.log(result.data);
  }

  async function updateMenuItem(id: any) {
    localStorage.setItems("dataId", id);
    history.push(`/menuprincipal/edit${id}`);
  }

  return (
    <MenuItemsContext.Provider
      value={{ items, createMenuItem, deleteMenuItem, updateMenuItem }}
    >
      {children}
    </MenuItemsContext.Provider>
  );
}

export function useNewAccount() {
  const context = useContext(MenuItemsContext);
  return context;
}
