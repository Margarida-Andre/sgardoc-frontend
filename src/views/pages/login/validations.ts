import * as Yup from "yup";

export const LoginForm = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: Yup.string()
    .required("campo obrigatório")
    .min(8, "A senha deve ser no mínimo 8 caracteres")
    .max(14, "A senha deve ser no máximo 14 caracteres"),
});
