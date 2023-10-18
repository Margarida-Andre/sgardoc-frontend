import * as yup from "yup";

export const MenuItemsForm = yup.object().shape({
  descricao: yup
    .string()
    .min(2, "Preencha seu nome completo")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Este é um campo obrigatório"),
  link: yup
    .string()
    .min(10, "Preencha seu nome completo")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Este é um campo obrigatório"),
  alt: yup.string().max(255, "O número máximo de caracteres é 255"),
  permissao: yup.number().required("Este é um campo obrigatório"),
  ocultar: yup.number().required("Este é um campo obrigatório"),
  ordenacao: yup
    .number()
    .integer("A ordenação deve ser um número inteiro")
    .positive("O desconto deve ser um número positivo")
    .typeError("A ordenação deve ser um número.")
    .required("Este é um campo obrigatório"),

  image: yup.mixed().required("Este é um campo obrigatório"),
});
