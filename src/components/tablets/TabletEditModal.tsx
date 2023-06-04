import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import {Tablet} from "../../data/tablet";

interface EditTabletModalProps {
    open: boolean
    onCancel: () => void;
    onSave: (editedTablet: Tablet) => void;
    tablet: Tablet;
}

const EditTabletModal: React.FC<EditTabletModalProps> = ({
    open,
    onCancel,
    onSave,
    tablet,
}) => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const editedtablet: Tablet = {
                    ...tablet,
                    name: values.name,
                };
                onSave(editedtablet);
                form.resetFields();
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={'Editar tablet'}
            destroyOnClose
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical">
                <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true, message: 'Digite o nome do tablet' }]}
                >
                    <Input placeholder="Nome do tablet" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTabletModal;