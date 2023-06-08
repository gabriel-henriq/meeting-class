import React, {useContext, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';

import {AppContext} from "../../pages/App.tsx";
import {Professor, ProfessorImpl} from "../../models/professor.ts";

const ProfessorCreate: React.FC = () => {
    const { professors, setProfessors } = useContext(AppContext);

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const onFinish = () => {
        form.validateFields().then((values: Professor) => {
            setProfessors([...professors, new ProfessorImpl(values.name)])
            form.resetFields();
            onClose();
        })
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>Adicionar</Button>
            <Drawer
                title="Adicionar novo Professor"
                width={310}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={() => form.submit()} type="primary">Criar</Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={true}
                    onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Nome"
                                rules={[{ required: true, message: 'Campo obrigatório!' }]}
                            >
                                <Input placeholder="Insira o nome do professor" style={{width: 200}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default ProfessorCreate;
