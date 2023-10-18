import * as yup from "yup";

export const NewAccountForm = yup.object().shape({
  DS_NOME: yup
    .string()
    .min(10, "Preencha seu nome completo")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Nome é obrigatório"),
  DS_EMAIL: yup
    .string()
    .email("Email Inválido")
    .required("Email é obrigatório"),
  DS_SENHA: yup
    .string()
    .max(8, "O número máximo de caracteres é 8")
    .min(6, "Digite pelo menos 6 caracteres")
    .required("Senha é obrigatório"),
  DS_SENHA_CONFIRMACAO: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("DS_SENHA")], "Senha não confirmada"),
  DS_TELEFONE: yup
    .number()
    .typeError("Isso não parece um número de telefone")
    .positive("O número do telefone não deve ser negativo")
    .integer("Um número do telefone não pode incluir um decimal")
    .min(8),

  DS_ENDERECO: yup
    .string()
    .max(255, "O número máximo de caracteres é 255")
    .required("Endereco é obrigatório"),
  DS_COMPLEMENTO: yup.string().max(255, "O número máximo de caracteres é 255"),
  DS_CPF: yup
    .number()
    .typeError("Isso não parece um número de CPF")
    .integer()
    .min(11, "Por favor, completa o CPF")
    .required("CPF é obrigatório"),

  DS_CEP: yup
    .number()
    .typeError("Isso não parece um número de CEP")
    .integer()
    .min(8, "Por favor, completa o CEP")
    .required("CEP é obrigatório"),
  CD_ONLINE: yup.string(),
  CD_STATUS: yup.string(),
  DT_ULTIMO_ACESSO: yup.string(),

  CD_FORMA_PAGAMENTO: yup.string(),
  DS_TITULAR_CARTAO: yup.string(),
  DS_CPF_CARTAO: yup.string(),
  DS_VALIDADE: yup.string(),
  DS_NUMERO_CARTAO: yup.string(),
  DS_CODIGO_VERIFICACAO: yup.string(),
});
