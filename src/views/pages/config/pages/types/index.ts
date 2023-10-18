import { Props } from "../../types";

export interface Pagestype {
  home: React.FC<Props>;
  campos: React.FC<Props>;
  disciplinas: React.FC<Props>;
  cursos: React.FC<Props>;
  classes: React.FC<Props>;

  camposEdit: React.FC<Props>;
  disciplinasEdit: React.FC<Props>;
  cursosEdit: React.FC<Props>;
  classesEdit: React.FC<Props>;

  cursosAdd: React.FC<Props>;
  camposAdd: React.FC<Props>;
  disciplinasAdd: React.FC<Props>;
  classesAdd: React.FC<Props>;
}
