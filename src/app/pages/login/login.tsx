import React, { useState } from "react";
import "./style.css";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { Validations } from "../../../core/utils/validations";
import Spinner from 'react-bootstrap/Spinner';
import { ILogin } from "../../../core/models/login";
import { GlobalFunctions } from "../../../core/utils/globalFunctions";
import { noAuthAxiosInstance } from "../../../core/api/axios/axiosInstance";
import { LOGIN } from "../../../core/utils/constans";
import CustomToast from "../../components/toast/toast";
import { useNavigate } from "react-router";
import { useAuth } from "../../../core/cotexto/authContext";
import { log } from "console";

const initialValues: ILogin = {
    email: "",
    password: "",
};

function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'error' | 'success'>('success');

    // login
    const signIn = async (document: string, password: string): Promise<any> => {
        console.log("Tentando se logar");
        console.log("login", document, "pass", password);
        return await noAuthAxiosInstance
            .post(LOGIN, {
                email: document,
                password: password,
            })
            .then(async (response) => {
                localStorage.setItem("@AuthData", response.data.token);
                setToastMessage('Logado com sucesso!');
                setToastType("success");
                setShowToast(true);
                setIsLoading(false);
                navigate("/inicio");
            })
            .catch((err: any) => {
                setToastMessage(err.response.data.error);
                setToastType("error");
                setShowToast(true);
                setIsLoading(false);
                return err.response.data.errors;
            });
    }

    return (
        <>
            <CustomToast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
            <div className="full-page">
                <div className="login-container shadow rounded">
                    <div className="logo">
                        <p className="poppins-semibold">Logo</p>
                    </div>
                    <div className="form">
                        <h2 className="poppins-regular">Login</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={Validations.loginSchema}
                            onSubmit={(value) => signIn(value.email, value.password)}
                        >
                            {({ isSubmitting }) => (
                                <FormikForm>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <Field
                                            name="password"
                                            type="password"
                                            placeholder="Senha"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Form.Group>
                                    <div className="d-flex flex-column">
                                        <Button variant="primary" type="submit" disabled={isSubmitting || isLoading}>
                                            {isLoading || isSubmitting ? <Spinner animation="border" role="status" /> : "Entrar"}
                                        </Button>
                                        <a href="/registrarConta">Não tem uma conta?</a>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
