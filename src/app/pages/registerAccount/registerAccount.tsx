import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik"
import { User } from "../../../core/models/user"
import { Validations } from "../../../core/utils/validations"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { noAuthAxiosInstance } from "../../../core/api/axios/axiosInstance"
import { REGISTER_USER } from "../../../core/utils/constans"
import CustomToast from "../../components/toast/toast"

const initialValues: User = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    cpf: "",
    street: "",
    city: "",
    state: "",
    zip_code: ""
}

export const RegisterAccount = () => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'error' | 'success'>('success');

    const handleSubmit = (values: User, resetForm: any) => {
        setIsSubmitting(true);
        noAuthAxiosInstance
            .post(`${REGISTER_USER}`, { ...values, user_type: "client" })
            .then(response => {
                setToastMessage('Cadastrado com sucesso!');
                setToastType("success");
                setShowToast(true);
                setIsSubmitting(false);
                resetForm();
                window.location.href = "/login";
            })
            .catch(error => {
                let { error: errorMessage } = error.response.data;
                console.error("Failed to update user data", errorMessage);
                setToastMessage(errorMessage);
                setToastType("error");
                setShowToast(true);
                setIsSubmitting(false);
            });
    }

    return (
        // container da página
        <div className="w-100 h-100 d-flex">
            <CustomToast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
            <div className="w-50 h-50 m-auto mt-5">
                <h1 className="text-center fw-normal">Crie sua conta</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Validations.editClientSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleSubmit(values, resetForm);
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, dirty }) => (
                        <FormikForm>
                            <div className="d-flex">
                                {/* dados pessoais */}
                                <div className="flex-fill">
                                    <Form.Group className="m-2" controlId="formName">
                                        <Form.Label>Nome</Form.Label>
                                        <Field name="name" type="text" placeholder="Nome" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="m-2" controlId="formCpf">
                                        <Form.Label>CPF</Form.Label>
                                        <Field name="cpf" type="text" placeholder="CPF" className="form-control" />
                                        <ErrorMessage name="cpf" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="m-2" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </Form.Group>
                                </div>

                                {/* endereço */}
                                <div className="flex-fill">
                                    <Form.Group className="m-2" controlId="formZipCode">
                                        <Form.Label>CEP</Form.Label>
                                        <Field name="zip_code" type="text" placeholder="CEP" className="form-control" />
                                        <ErrorMessage name="zip_code" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="m-2" controlId="formStreet">
                                        <Form.Label>Rua</Form.Label>
                                        <Field name="street" type="text" placeholder="Rua" className="form-control" />
                                        <ErrorMessage name="street" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="m-2" controlId="formCity">
                                        <Form.Label>Cidade</Form.Label>
                                        <Field name="city" type="text" placeholder="Cidade" className="form-control" />
                                        <ErrorMessage name="city" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="m-2" controlId="formState">
                                        <Form.Label>Estado</Form.Label>
                                        <Field name="state" type="text" placeholder="Estado" className="form-control" />
                                        <ErrorMessage name="state" component="div" className="text-danger" />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group className="m-2" controlId="formPassword">
                                <Form.Label>Senha</Form.Label>
                                <Field name="password" type="password" placeholder="Senha"
                                    className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group className="m-2" controlId="formConfirmPassword">
                                <Form.Label>Confirme a Senha</Form.Label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirme a Senha"
                                    className="form-control"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </Form.Group>
                            <Button
                                style={{ margin: 'auto' }}
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Enviar
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </div>
    )
}