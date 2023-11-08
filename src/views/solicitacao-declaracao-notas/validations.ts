import * as Yup from "yup";

export const InscricaoForm = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .min(10, "Preencha o campo email")
    .max(255, "Só é permitido 255 caracteres para o email")
    .required("Este é um campo obrigatório"),
  telefonePrincipal: Yup.number()
    .required("Este é um campo obrigatório")
    .positive("O campo deve ser positivo")
    .integer("O campo deve ser um número inteiro"),
  telefoneAlternativo: Yup.number()
    .required("Este é um campo obrigatório")
    .positive("O campo deve ser positivo")
    .integer("O campo deve ser um número inteiro"),
  comprovativoPagamento: Yup.string().required("Este é um campo obrigatório"),
  cursoId: Yup.string()
    .min(2, "Preencha o campo curso")
    .max(255, "Só é permitido 255 caracteres para o curso")
    .required("Este é um campo obrigatório"),
  grauAcademicoId: Yup.string()
    .min(2, "Preencha o campo grau acadêmico")
    .max(255, "Só é permitido 255 caracteres para o grau acadêmico")
    .required("Este é um campo obrigatório"),
  tipoDeclaracaoId: Yup.string()
    .min(2, "Preencha o campo tipo")
    .max(255, "Só é permitido 255 caracteres para o tipo")
    .required("Este é um campo obrigatório"),
  duracaoDeclaracaoId: Yup.string()
    .min(2, "Preencha o campo duração")
    .max(255, "Só é permitido 255 caracteres para o duração")
    .required("Este é um campo obrigatório"),
  efeitoDeclaracaoId: Yup.string()
    .min(2, "Preencha o campo efeito")
    .max(255, "Só é permitido 255 caracteres para o efeito")
    .required("Este é um campo obrigatório"),
});
