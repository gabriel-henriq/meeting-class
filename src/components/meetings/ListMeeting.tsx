import React, { useContext } from 'react';
import { Tabs, Table } from 'antd';
import { Dayjs } from 'dayjs';
import { ColumnProps } from 'antd/es/table';

import { AppContext, AppContextProps } from '../../pages/App';
import { Student } from '../../models/student.ts';

interface MeetingProps {
    schedule: [Dayjs, Dayjs];
    professor: string;
    tablet?: string;
    classroom: string;
    students: string[];
}

const ClassroomTabs: React.FC<{
    dataSource: MeetingProps[];
}> = ({ dataSource }) => {
    const columns: ColumnProps<MeetingProps>[] = [
        {
            title: 'Horário',
            dataIndex: 'schedule',
            key: 'schedule',
            width: '10%',
            render: (schedule: [Dayjs, Dayjs]) => `${schedule[0].format('HH:mm')} - ${schedule[1].format('HH:mm')}`,
        },
        {
            title: 'Professor',
            dataIndex: 'professor',
            key: 'professor',
            width: '20%',
        },
        {
            title: 'Sala',
            dataIndex: 'classroom',
            key: 'classroom',
            width: '20%',
        },
        {
            title: 'Alunos',
            dataIndex: 'students',
            key: 'students',
            render: (students: Student[]) => students.map((student) => student.name).join(', '),
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};

const ListMeeting: React.FC = () => {
    const { schedules } = useContext<AppContextProps>(AppContext);

    const dayTabs = Object.entries(schedules).map(([dayOfWeek, daySchedules]) => {
        const meetingPropsArray: MeetingProps[] = []; // Create an array to hold MeetingProps

        daySchedules.forEach((meeting) => {
            const meetingProps: MeetingProps = {
                schedule: meeting.schedule,
                professor: meeting.professor.name,
                tablet: meeting.tablet?.name,
                classroom: meeting.classroom.name,
                students: meeting.students.map((student) => student.name),
            };

            meetingPropsArray.push(meetingProps); // Add each meetingProps to the array
        });

        return {
            label: dayOfWeek,
            key: dayOfWeek,
            children: <ClassroomTabs dataSource={meetingPropsArray} />,
        };
    });

    return <Tabs defaultActiveKey="Seg" type="card" size="large" items={dayTabs} />;
};

export default ListMeeting;
