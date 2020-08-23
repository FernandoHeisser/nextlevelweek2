import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input/index';
import TextArea from '../../components/TextArea/index';
import Select from '../../components/Select/index';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

interface schedule {
    week_day: number, from: string, to: string
}

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [weekDay] = useState('');
    
    const [scheduleItems, setScheduleItems] = useState([{ week_day: weekDay, from: '', to: '' }]);
    
    function keyGenerator(week_day: string, from: string, to: string) {
        from = from.replace(' ', '');
        to = to.replace(' ', '');
        return week_day.toString() + '-' + from + '-' + to;
    }

    function addNewScheduleItem() {
        if(scheduleItems[scheduleItems.length-1].from === '' || scheduleItems[scheduleItems.length-1].to === '') {
            alert('Preencha os campos do horário atual antes de adicionar um novo horário.');
        } else {
            setScheduleItems([...scheduleItems, { week_day: weekDay, from: '', to: '' }]);
        }
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=>{
            if (index === position) {
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        })
        setScheduleItems(updatedScheduleItems);
    }

    function validateScheduleItems(e: FormEvent) {        
        e.preventDefault();
       
        var teste = [];
        if(scheduleItems.length > 1) {
                teste = scheduleItems.map((scheduleItem)=>{
                if(scheduleItem.from === '' || scheduleItem.to === '') {
                    return false;
                } else {
                    return true;
                }
            })
            if(teste.indexOf(false) === -1){
                handleCreateClass();
            } else {
                alert('Você deixou campos em branco');
                console.log(teste);
            }
        } else {
            if(scheduleItems[0].from === '' || scheduleItems[0].to === '') {
                alert('Preencha os campos dos horários disponíveis');
            } else {
                handleCreateClass();
            }
        }
    }

    function handleCreateClass() {
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(()=>{
            alert('Erro no cadastro')
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulãrio de inscrição"
            />
            <main>
                <form onSubmit={validateScheduleItems} autoComplete='off'>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            required
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />  
                        <Input 
                            required
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={e=>setAvatar(e.target.value)}
                        />  
                        <Input 
                            required
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            min="11"
                            max="11"
                            onChange={e=>setWhatsapp(e.target.value)}
                        />  
                        <TextArea 
                            required
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={e=>setBio(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            required
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={e=>setSubject(e.target.value)}
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
                        <Input 
                            required
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            onChange={e=>setCost(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => (
                        <div 
                            key={keyGenerator(scheduleItem.week_day,scheduleItem.from,scheduleItem.to)} 
                            className="schedule-item"
                        >
                            <Select 
                                name="week_day" 
                                label="Dia da semana"
                                value={scheduleItem.week_day}
                                onChange={e=>setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    { value: '0', label: 'Domingo' },
                                    { value: '1', label: 'Segunda-feira' },
                                    { value: '2', label: 'Terça-feira' },
                                    { value: '3', label: 'Quarta-feira' },
                                    { value: '4', label: 'Quinta-feira' },
                                    { value: '5', label: 'Sexta-feira' },
                                    { value: '6', label: 'Sábado' }
                                ]}
                            />
                            <Input
                                name="from"
                                label="Das"
                                type="time"
                                value={scheduleItem.from}
                                onChange={e=>setScheduleItemValue(index, 'from', e.target.value)}
                            />
                            <Input
                                name="to"
                                label="Até"
                                type="time"
                                value={scheduleItem.to}
                                onChange={e=>setScheduleItemValue(index, 'to', e.target.value)}
                             />
                        </div>
                        ))}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante!
                            <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm; 