import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input/index';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(()=>{
        async function asyncFunction() {
            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time
                }
            });
            setTeachers(response.data);
        }
        asyncFunction();
    }, [subject, week_day, time])

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select  
                        value={subject}
                        onChange={e=>setSubject(e.target.value)}
                        name="subject" 
                        label="Matéria"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Filosofia', label: 'Filosofia' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Informática', label: 'Informática' },
                            { value: 'Língua Portuguesa', label: 'Língua Portuguesa' },
                            { value: 'Língua Inglesa', label: 'Língua Inglesa' },
                            { value: 'Língua Espanhola', label: 'Língua Espanhola' },
                            { value: 'Literatura', label: 'Literatura' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Sociologia', label: 'Sociologia' }
                        ]}
                    />
                    <Select 
                        value={week_day}
                        onChange={e=>setWeekDay(e.target.value)}
                        name="week_day" 
                        label="Dia da semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input 
                        value={time}
                        onChange={e=>setTime(e.target.value)}
                        name="time"
                        label="Hora"
                        type="time"
                    />
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher)=>(
                    <TeacherItem key={teacher.id} teacher={teacher}/>
                ))}
            </main>
        </div>
    );
}

export default TeacherList;