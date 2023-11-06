import * as Yup from "yup";

export const PautaForm = Yup.object().shape({
  nota1: Yup.number()
    .positive("A primeira nota deve ser um valor positivo")
    .required("Este é um campo obrigatório"),
  nota2: Yup.number()
    .positive("A segunda nota deve ser um valor positivo")
    .required("Este é um campo obrigatório"),
});
