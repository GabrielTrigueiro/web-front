import * as Yup from "yup";

const indicationSchema = Yup.object().shape({
  codigo: Yup.string().required("O código é obrigatório"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 000.000.000-00"
    ),
  desconto: Yup.number()
    .required("O desconto é obrigatório")
    .min(0, "O desconto não pode ser negativo")
    .max(100, "O desconto não pode ser superior a 100")
    .typeError("O desconto deve ser um número válido"),
  email: Yup.string().required("O email é obrigatório").email("Email inválido"),
});

const produtoSchema = Yup.object().shape({
  nome: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome pode ter no máximo 100 caracteres"),
  descricao: Yup.string()
    .min(20, "A descrição tem que ter no mínimo 20 caracteres"),
  preco: Yup.number()
    .required("O preço é obrigatório")
    .min(0.01, "O preço deve ser maior que 0")
    .typeError("O preço deve ser um número válido"),
  estoque: Yup.number()
    .required("O estoque é obrigatório")
    .integer("O estoque deve ser um número inteiro")
    .min(0, "O estoque não pode ser negativo")
    .typeError("O estoque deve ser um número válido"),
  img: Yup.string().required("A imagem é obrigatória"),
  categoria: Yup.string().required("A categoria é obrigatória"),
});

const editClientSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  name: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  street: Yup.string().required("Rua é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
  zip_code: Yup.string().required("CEP é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: Yup.string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
});

export const Validations = {
  produtoSchema,
  loginSchema,
  editClientSchema,
  indicationSchema,
};
