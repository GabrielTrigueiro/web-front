import * as Yup from "yup";

const registerClientSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
  name: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  street: Yup.string().required("Rua é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
  zip_code: Yup.string().required("CEP é obrigatório"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
});

export const Validations = {
  registerClientSchema,
  loginSchema,
};
