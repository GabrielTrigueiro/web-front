import {Formik, Form as FormikForm, Field, ErrorMessage, useFormik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import {useCallback, useState} from 'react';

import {Validations} from '../../../core/utils/validations';
import CustomToast from '../../components/toast/toast';
import {axiosInstance} from '../../../core/api/axios/axiosInstance';
import {Product} from '../../../core/models/product';
import {REGISTER_PRODUCT} from '../../../core/utils/constans';

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
    const [photo, setPhoto] = useState<File>();
    const [b64, setB64] = useState<string>()

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
                setPhoto(undefined);
                setB64(undefined);
                resetForm();
            })
            .catch(error => {
                let {error: errorMessage} = error.response.data;
                console.error("Failed to update user data", errorMessage);
                setToastMessage(errorMessage);
                setToastType("error");
                setShowToast(true);
                setIsSubmitting(false);
            });
    }

    const handleImageChange = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setPhoto(file);
            console.log(file)
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                console.log(base64String.split(',')[1])
                formik.setFieldValue("img", base64String.split(',')[1]);
                setB64(base64String)
            };
            reader.readAsDataURL(file);
        }
    };

    const formik = useFormik<Product>({
        initialValues,
        validationSchema: Validations.produtoSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            handleSubmit(values, resetForm)
            setSubmitting(false);
        }
    });

    return (
        <>
            <CustomToast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
            <div className={'w-50 m-auto d-flex flex-row bg-light shadow-sm rounded p-1'}>
                <div className={'d-flex flex-column gap-3'}>
                    <div className={'bg-white flex-fill d-flex justify-content-center align-items-center rounded'}>
                        {b64 && <img src={b64} alt="Produto" style={{ maxHeight: '200px', maxWidth: '100%' }} />}
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupFile01">Imagem:</label>
                        <input
                            type="file"
                            className={`form-control ${formik.touched.img && formik.errors.img ? 'is-invalid' : ''}`}
                            id="floatingInput"
                            name="img"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.img && formik.errors.img ? (
                            <div className="invalid-feedback">{formik.errors.img}</div>
                        ) : null}
                    </div>
                </div>
                <div className={'flex-fill rounded-end py-2 px-3'}>
                    <h3 className={'text-center'}>Adicionando produto</h3>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${formik.touched.nome && formik.errors.nome ? 'is-invalid' : ''}`}
                            id="floatingInput"
                            placeholder="Nome..."
                            name="nome"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInput">Nome do produto</label>
                        {formik.touched.nome && formik.errors.nome ? (
                            <div className="invalid-feedback">{formik.errors.nome}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <select
                            className={`form-select form-select-sm ${formik.touched.categoria && formik.errors.categoria ? 'is-invalid' : ''}`}
                            aria-label="Default select example"
                            name="categoria"
                            value={formik.values.categoria}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Categoria do produto</option>
                            <option value="Cozinha">Cozinha</option>
                            <option value="Casa">Casa</option>
                            <option value="Elétrônico">Elétrônico</option>
                        </select>
                        {formik.touched.categoria && formik.errors.categoria ? (
                            <div className="invalid-feedback">{formik.errors.categoria}</div>
                        ) : null}
                    </div>
                    <div className={'d-flex flex-row mb-3 gap-3'}>
                        <div className="form-floating flex-fill">
                            <input
                                type="number"
                                className={`form-control ${formik.touched.estoque && formik.errors.estoque ? 'is-invalid' : ''}`}
                                id="floatingInput"
                                placeholder="Quantidade..."
                                name="estoque"
                                value={formik.values.estoque}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInput">Quantidade em estoque</label>
                            {formik.touched.estoque && formik.errors.estoque ? (
                                <div className="invalid-feedback">{formik.errors.estoque}</div>
                            ) : null}

                        </div>
                        <div className="form-floating flex-fill">
                            <input
                                type="number"
                                className={`form-control ${formik.touched.preco && formik.errors.preco ? 'is-invalid' : ''}`}
                                id="floatingInput"
                                placeholder="Preço..."
                                name="preco"
                                value={formik.values.preco}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInput">Preço do produto</label>
                            {formik.touched.preco && formik.errors.preco ? (
                                <div className="invalid-feedback">{formik.errors.preco}</div>
                            ) : null}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Descrição do produto:</label>
                        <textarea
                            className={`form-control ${formik.touched.descricao && formik.errors.descricao ? 'is-invalid' : ''}`}
                            id="exampleFormControlTextarea1"
                            rows={3}
                            name="descricao"
                            value={formik.values.descricao}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.touched.descricao && formik.errors.descricao ? (
                            <div className="invalid-feedback">{formik.errors.descricao}</div>
                        ) : null}
                    </div>
                    <button onClick={() => formik.handleSubmit()} type={'submit'}
                            className={'btn btn-primary w-100'}>Registrar produto
                    </button>
                </div>
            </div>
        </>
    )
}