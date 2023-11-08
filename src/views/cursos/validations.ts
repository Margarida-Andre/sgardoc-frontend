import * as Yup from "yup";

export const InscricaoForm = Yup.object().shape({
  designacao: Yup.string()
    .min(5, "Preencha o campo designacao")
    .max(255, "Só é permitido 255 caracteres para a designacao")
    .required("Este é um campo obrigatório"),
});
