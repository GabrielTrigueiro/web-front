import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import { Validations } from "../../../core/utils/validations";
import { axiosInstance } from "../../../core/api/axios/axiosInstance";
import { LIST_USERS, UPDATE_USER } from "../../../core/utils/constans";
import CustomToast from "../../components/toast/toast";
import { User } from '../../../core/models/user';

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

export const Account: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
    const [userData, setUserData] = useState<User>(initialValues);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'error' | 'success'>('success');

    const handleSubmit = (values: User) => {
        setIsSubmitting(true);
        axiosInstance
            .put(`${UPDATE_USER}${values.id}`, values)
            .then(response => {
                let user = { ...response.data, password: "" };
                setUserData(user);
                setToastMessage('Editado com sucesso!');
                setToastType("success");
                setShowToast(true);
                setIsSubmitting(false);
            })
            .catch(error => {
                console.error("Failed to update user data", error);
                setIsSubmitting(false);
            });
    }

    const getToken = () => {
        const token = localStorage.getItem("@AuthData");
        if (token) {
            setIsAuthenticated(token);
        }
    };

    const fetchUserData = async (token: string) => {
        // token traduzido
        const decoded: any = jwtDecode(token);
        const allUsers = await axiosInstance.get(LIST_USERS)
            .then(response => {
                return response.data;
            });
        console.log('usuario encontrado')
        const thisUser = (allUsers.find((user: any) => user.email === decoded.email));
        console.log(thisUser)
        if (thisUser) {
            let user = { ...thisUser, password: "" };
            setUserData(user)
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData(isAuthenticated);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div style={{ background: '#fff', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
            <h1>Você não está logado</h1>
            <Button href="/login" variant="primary" size="lg">Fazer Login</Button>
            <Button href="/registrarConta" variant="primary" size="lg">Não tem uma conta?</Button>
        </div>
    }

    if (userData === initialValues || isSubmitting) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div style={{ background: '#fff', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CustomToast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
            <div>
                <h1 style={{ textAlign: 'center' }}>Sua conta</h1>
                <Formik
                    initialValues={{
                        ...userData,
                        confirmPassword: '',
                    }}
                    validationSchema={Validations.editClientSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, dirty }) => (
                        <FormikForm style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: 800, height: 400, overflowY: 'scroll' }}>
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

                                <Form.Group className="m-2" controlId="formZipCode">
                                    <Form.Label>CEP</Form.Label>
                                    <Field name="zip_code" type="text" placeholder="CEP" className="form-control" />
                                    <ErrorMessage name="zip_code" component="div" className="text-danger" />
                                </Form.Group>

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
                            </div>
                            <Button style={{ margin: 'auto' }} variant="primary" type="submit"
                                disabled={isSubmitting || !dirty}>
                                Salvar
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Account;