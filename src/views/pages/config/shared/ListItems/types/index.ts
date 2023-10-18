import {
  Classe,
  Curso,
  Disciplina,
  Input,
} from "../../../store/configurations/types";

export type Props = {
  items: Curso[] | Disciplina[] | Input[] | Classe[];
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
};
