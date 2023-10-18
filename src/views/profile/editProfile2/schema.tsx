import * as Yup from "yup"

export default Yup.object().shape({
    name: Yup.string().min(2, "O nome deve conter no mínimo 2 letras.!").required("Este campo é obrigatório.!"),
    owner: Yup.string().min(2, "O nome deve conter no mínimo 2 letras.!").required("Este campo é obrigatório.!"),
    nif: Yup.string().min(6, "O NIF deve conter no mínimo 6 caracteres.!").required("Este campo é obrigatório.!"),
    category: Yup.string().required("Este campo é obrigatório.!"),
    date: Yup.date().required("Este campo é obrigatório.!"),
    province: Yup.string().required("Este campo é obrigatório.!"),
    municipe: Yup.string().required("Este campo é obrigatório.!"),
    city: Yup.string().required("Este campo é obrigatório.!"),
    latitude: Yup.string().required("Este campo é obrigatório.!"),
    longitude: Yup.string().required("Este campo é obrigatório.!"),
    email: Yup.string().email('Email não válido').required("Este campo é obrigatório.!"),
    contacto: Yup.string().required("Este campo é obrigatório.!.!"),
    aboutSalon: Yup.string(),
})
