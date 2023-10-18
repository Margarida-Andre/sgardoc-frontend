import React from "react";
import {
  Classe,
  Curso,
  Disciplina,
  Input,
} from "../../store/configurations/types";
import { ListItemsContainer } from "./styles";
import { Props } from "./types";

const ListItems: React.FC<Props> = ({ items, handleDelete, handleEdit }) => {
  return (
    <ListItemsContainer>
      {items &&
        items.map(
          (item: Curso | Disciplina | Input | Classe, index: number) => (
            <li key={index}>
              <strong> {item.name} </strong>
              <div>
                <button
                  type="button"
                  id="editItem"
                  onClick={() => handleEdit(index)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  id="deleteItem"
                  onClick={() => handleDelete(index)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          )
        )}
    </ListItemsContainer>
  );
};

export default ListItems;
