import * as Yup from "yup";

export const InscricaoForm = Yup.object().shape({
  designacao: Yup.string()
    .min(2, "Preencha o campo designacao")
    .max(255, "Só é permitido 255 caracteres para a designacao")
    .required("Este é um campo obrigatório"),
  descricao: Yup.string()
    .min(5, "Preencha o campo descricao")
    .max(255, "Só é permitido 255 caracteres para a descricao")
    .required("Este é um campo obrigatório"),
  semestreId: Yup.number().required("Este é um campo obrigatório"),
  grauAcademicoId: Yup.string().required("Este é um campo obrigatório"),
  cursoId: Yup.string().required("Este é um campo obrigatório"),
});
