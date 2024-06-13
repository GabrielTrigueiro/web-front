import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';

import { Validations } from '../../../core/utils/validations';
import CustomToast from '../../components/toast/toast';
import { useState } from 'react';
import { axiosInstance } from '../../../core/api/axios/axiosInstance';
import { Product } from '../../../core/models/product';
import { REGISTER_PRODUCT } from '../../../core/utils/constans';

export const RegisterProduct = () => {
    const initialValues: Product = {
        categoria: "",
        descricao: "",
        estoque: 0,
        img: "",
        nome: "",
        preco: 0
    };

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'error' | 'success'>('success');

    const handleSubmit = (values: Product, resetForm: any) => {
        setIsSubmitting(true);
        axiosInstance
            .post(`${REGISTER_PRODUCT}`, values)
            .then(response => {
                setToastMessage('Produto registrado com sucesso!');
                setToastType("success");
                setShowToast(true);
                setIsSubmitting(false);
                resetForm();
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
        <div style={{ background: '#fff', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CustomToast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
            <div>
                <h1 style={{ textAlign: 'center' }}>Nova indicação</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Validations.indicationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleSubmit(values, resetForm);
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, dirty }) => (
                        <FormikForm style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: 800, height: 400, overflowY: 'scroll' }}>
                                <Form.Group className="m-2" controlId="formCodigo">
                                    <Form.Label>
                                        Código
                                    </Form.Label>
                                    <Field
                                        name="codigo"
                                        type="codigo"
                                        placeholder="Código..."
                                        className="form-control"
                                    />
                                    <ErrorMessage name="codigo" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="m-2" controlId="formName">
                                    <Form.Label>Cpf</Form.Label>
                                    <Field name="cpf" type="text" placeholder="Cpf..." className="form-control" />
                                    <ErrorMessage name="cpf" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="m-2" controlId="formCpf">
                                    <Form.Label>Desconto</Form.Label>
                                    <Field name="desconto" type="text" placeholder="Desconto R$..." className="form-control" />
                                    <ErrorMessage name="desconto" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="m-2" controlId="formStreet">
                                    <Form.Label>Email</Form.Label>
                                    <Field name="email" type="text" placeholder="e-mail..." className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </Form.Group>
                            </div>
                            <Button style={{ margin: 'auto' }} variant="primary" type="submit"
                                disabled={isSubmitting}>
                                Salvar
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </div>
}