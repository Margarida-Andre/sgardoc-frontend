import * as Yup from "yup";

export const InscricaoForm = Yup.object().shape({
  provinciaId: Yup.number().required("Este é um campo obrigatório"),
  municipioId: Yup.number().required("Este é um campo obrigatório"),
  estadoCivilId: Yup.number().required("Este é um campo obrigatório"),
  generoId: Yup.number().required("Este é um campo obrigatório"),
  opcao1CursoId: Yup.string().required("Este é um campo obrigatório"),
  opcao2CursoId: Yup.string().required("Este é um campo obrigatório"),
  nome: Yup.string()
    .min(2, "Preencha o campo nome")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Este é um campo obrigatório"),
  nomePai: Yup.string()
    .min(2, "Preencha o campo nome do pai")
    .max(255, "Só é permitido 255 caracteres para o nome do pai")
    .required("Este é um campo obrigatório"),
  nomeMae: Yup.string()
    .min(2, "Preencha o campo nome da mãe")
    .max(255, "Só é permitido 255 caracteres para o nome da mãe")
    .required("Este é um campo obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .min(10, "Preencha o campo email")
    .max(255, "Só é permitido 255 caracteres para o email")
    .required("Este é um campo obrigatório"),
  dataNascimento: Yup.date().required("Este é um campo obrigatório"),
  numeroBi: Yup.string()
    .required("Este é um campo obrigatório")
    .min(14, "O número do BI deve ser no mínimo 14 caracteres")
    .max(14, "O número do BI deve ser no máximo 14 caracteres"),
  dataEmissaoBi: Yup.date().required("Este é um campo obrigatório"),
  validadeBi: Yup.date().required("Este é um campo obrigatório"),
  arquivoIdentificacao: Yup.string().required("Este é um campo obrigatório"),
  telefonePrincipal: Yup.number()
    .required("Este é um campo obrigatório")
    .positive("O campo deve ser positivo")
    .integer("O campo deve ser um número inteiro"),
  certificadoEnsinoMedio: Yup.string().required("Este é um campo obrigatório"),
  carregamentoFotografia: Yup.string().required("Este é um campo obrigatório"),
  comprovativoPagamento: Yup.string().required("Este é um campo obrigatório"),
});
