import React, { useState, useContext, useEffect  } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import {
    Button,
    Drawer,
    Form,
    TimePicker,
    message,
    Select,
    Space,
    SelectProps,
    Input,
    TimeRangePickerProps
} from 'antd';


import { AppContext, AppContextProps } from '../../pages/App';
import { generateUniqueId } from "../../utils/uuid.ts";

import { Meeting } from '../../models/meeting.ts';
import { Classroom } from '../../models/classroom.ts';
import { Professor } from '../../models/professor.ts';
import { Tablet } from '../../models/tablet.ts';
import { Student } from '../../models/student.ts';


interface FormValues {
    schedule?: [Dayjs, Dayjs];
    professor?: string;
    room?: string;
    tablet?: string;
    students?: Student[];
    observation?: string;
}


const CreateMeeting: React.FC = () => {
    const { professors, classrooms, tablets, meetings, setMeetings } = useContext<AppContextProps>(AppContext);

    const [availableProfessors, setAvailableProfessors] = useState<Professor[]>([]);
    const [availableClassrooms, setAvailableClassrooms] = useState<Classroom[]>([]);
    const [availableTablets, setAvailableTablets] = useState<Tablet[]>([]);
    const [schedule, setSchedule] = useState<Dayjs[] | null>(null);

    const [form] = Form.useForm<FormValues>();

    const [formValues] = useState<FormValues>({
        observation: "",
        professor: "",
        room: "",
        schedule: undefined,
        students: [],
        tablet: ""
    });

    const [open, setOpen] = useState(false);


    useEffect(() => {
        const filterOptions = (rangeStart: Dayjs, rangeEnd: Dayjs) => {
            const filteredProfessors = professors.filter((professor) => {
                return !meetings.some((meeting) => {
                    const meetingStart = meeting.startTime;
                    const meetingEnd = meeting.endTime;
                    return (
                        meeting.professor.id === professor.id &&
                        ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                            (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
                    );
                });
            });

            const filteredClassrooms = classrooms.filter((classroom) => {
                return !meetings.some((meeting) => {
                    const meetingStart = meeting.startTime;
                    const meetingEnd = meeting.endTime;
                    return (
                        meeting.classroom.id === classroom.id &&
                        ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                            (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
                    );
                });
            });

            const filteredTablets = tablets.filter((tablet) => {
                return !meetings.some((meeting) => {
                    const meetingStart = meeting.startTime;
                    const meetingEnd = meeting.endTime;
                    return (
                        meeting.tablet?.id === tablet.id &&
                        ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                            (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
                    );
                });
            });

            setAvailableProfessors(filteredProfessors);
            setAvailableClassrooms(filteredClassrooms);
            setAvailableTablets(filteredTablets);
        };

        if (schedule) {
            const [rangeStart, rangeEnd] = schedule;
            // Call the filter function with the current selected time range
            filterOptions(rangeStart, rangeEnd);
        }
    }, [formValues.schedule, professors, classrooms, tablets, meetings, schedule]);


    const handleFinish = () => {
        const values = form.getFieldsValue();
        const selectedProfessor = professors.find((professor) => professor.id === values.professor);
        const selectedClassroom = classrooms.find((classroom) => classroom.id === values.room);
        const selectedTablet = tablets.find((tablet) => tablet.id === values.tablet);

        if (!selectedProfessor || !selectedClassroom) {
            message.error('Por favor, selecione um professor e uma sala.');
            return;
        }

        const [rangeStart, rangeEnd] = values.schedule as [Dayjs, Dayjs];

        if (!rangeStart || !rangeEnd || rangeEnd.isBefore(rangeStart)) {
            message.error('Por favor, selecione um horário válido.');
            return;
        }

        const isProfessorAvailable = !meetings.some((meeting) => {
            const meetingStart = meeting.startTime;
            const meetingEnd = meeting.endTime;
            return (
                meeting.professor.id === selectedProfessor.id &&
                ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                    (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
            );
        });

        const isClassroomAvailable = !meetings.some((meeting) => {
            const meetingStart = meeting.startTime;
            const meetingEnd = meeting.endTime;
            return (
                meeting.classroom.id === selectedClassroom.id &&
                ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                    (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
            );
        });

        const isTabletAvailable = !meetings.some((meeting) => {
            const meetingStart = dayjs(meeting.startTime);
            const meetingEnd = dayjs(meeting.endTime);
            return (
                meeting.tablet?.id === selectedTablet?.id &&
                ((meetingStart.isAfter(rangeStart) && meetingStart.isBefore(rangeEnd)) ||
                    (meetingEnd.isAfter(rangeStart) && meetingEnd.isBefore(rangeEnd)))
            );
        });

        if (!isProfessorAvailable) {
            message.error('O professor não está disponível para esse horário.');
            return;
        }

        if (!isClassroomAvailable) {
            message.error('A Sala não disponível para esse horário.');
            return;
        }

        if (selectedTablet && !isTabletAvailable) {
            message.error('O Tablet não disponível para esse horário.');
            return;
        }

        const newMeeting: Meeting = {
            id: generateUniqueId(),
            startTime: rangeStart,
            endTime: rangeEnd,
            professor: selectedProfessor,
            tablet: selectedTablet,
            classroom: selectedClassroom,
            students: values.students || [],
            observation: values.observation || '',
        };

        // Add the new meeting to the meetings array
        setMeetings([...meetings, newMeeting]);

        console.log(meetings)
        form.resetFields()
        message.success('Aula criada com sucesso!');
    };


    const options: SelectProps['options'] = [];

    const handleScheduleChange: TimeRangePickerProps['onChange'] = (values) => {
        if (values && values[0] && values[1]) {
            const rangeStart = values[0];
            const rangeEnd = values[1];
            setSchedule([rangeStart, rangeEnd]);
        } else {
            setSchedule(null);
        }
    };

    const { TextArea } = Input;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };


    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
                Adicionar
            </Button>
            <Drawer title="Criar Aula" width={510} onClose={() => {setOpen(false);form.resetFields()}} open={open}>
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    requiredMark={true}
                    initialValues={formValues}
                >
                    <Form.Item label="Horário" name="schedule" rules={[{ required: false }]}>
                        <TimePicker.RangePicker onChange={handleScheduleChange} format={'HH:mm'} placeholder={['Inicio', 'Fim']} />
                    </Form.Item>

                    <Form.Item name="professor" label="Professor" rules={[{ required: false, message: 'Selecione um professor!' }]}>
                        <Select placeholder="Selecione um professor">
                            {availableProfessors.map((professor) => (
                                <Select.Option key={professor.id} value={professor.id}>
                                    {professor.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="room" label="Sala" rules={[{ required: false, message: 'Selecione uma sala!' }]}>
                        <Select placeholder="Selecione uma sala">
                            {availableClassrooms.map((classroom) => (
                                <Select.Option key={classroom.id} value={classroom.id}>
                                    {classroom.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="tablet" label="Tablet" rules={[{ required: false }]}>
                        <Select placeholder="Selecione um tablet">
                            {availableTablets.map((tablet) => (
                                <Select.Option key={tablet.id} value={tablet.id}>
                                    {tablet.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="students"
                        label="Alunos"
                        rules={[{ required: false, message: 'Adicione ao menos um aluno!', type: 'array' }]}
                    >
                        <Select
                            mode="tags"
                            placeholder="Adicionar Alunos"
                            // onChange={handleChange}
                            style={{ width: '100%' }}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item name="observation" label="Observação">
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ width: '100%', resize: 'none' }}
                            onChange={onChange}
                            placeholder="Fechar a porta da sala"
                        />
                    </Form.Item>
                </Form>
                <Space direction="horizontal" align={'end'} size={12}>
                    <Button key="cancel">Cancelar</Button>
                    <Button type="primary" onClick={handleFinish}>
                        Criar Aula
                    </Button>
                </Space>
            </Drawer>
        </>
    );
};

export default CreateMeeting;
