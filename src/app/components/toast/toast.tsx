import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface CustomToastProps {
    message: string;
    type: 'error' | 'success';
    show: boolean;
    onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, show, onClose }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={onClose} bg={type === 'success' ? 'success' : 'danger'}>
                <Toast.Header>
                    <strong className="me-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default CustomToast;
