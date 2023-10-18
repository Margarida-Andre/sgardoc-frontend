import * as yup from "yup";

//const tipo = useState<any[]>([]);
//const validTipo = tipo.map(( id ) => id);

export const ArquivoForm = yup.object().shape({
  DS_ARQUIVO: yup
    .string()
    .min(2, "Preencha este campo")
    .max(255, "Só é permitido 255 caracteres para este campo")
    .required("Este é um campo obrigatório"),
  DS_RESUMO: yup
    .string()
    .min(2, "Preencha este campo")
    .max(255, "Só é permitido 255 caracteres para este campo")
    .required("Este é um campo obrigatório"),
  DS_DESCRICAO: yup
    .string()
    .min(2, "Preencha este campo")
    .max(255, "Só é permitido 255 caracteres para este campo")
    .required("Este é um campo obrigatório"),
  CD_ORDENACAO: yup
    .number()
    .integer("A ordenação deve ser um número inteiro")
    .positive("A ordenação deve ser um número positivo")
    .typeError("A ordenação deve ser um número."),
  DS_TEXTO_THUMBNAIL: yup
    .string()
    .min(2, "Preencha este campo")
    .max(255, "Só é permitido 255 caracteres para este campo"),
  DS_TEXTO_LINK: yup
    .string()
    .min(2, "Preencha este campo")
    .max(255, "Só é permitido 255 caracteres para este campo")
    .required("Este é um campo obrigatório"),
  DS_LINK_THUMBNAIL: yup.mixed().required("Este é um campo obrigatório"),
  DS_LINK_ARQUIVO: yup.mixed().required("Este é um campo obrigatório"),

  CD_TIPO: yup
    .string()
    //.oneOf(validCurso, "Selecione um tratamento, por favor!")
    .required("Este é um campo obrigatório"),
});
