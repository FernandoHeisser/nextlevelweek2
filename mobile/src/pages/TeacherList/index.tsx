import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text }from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import api from '../../services/api';
import TeacherItem, { Teacher } from '../../components/TeacherItem/index';
import PageHeader from '../../components/PageHeader';
import styles from './styles';

function TeacherList() {
    const [icon, setIcon] = useState("chevron-down");
    const [activated, setActivated] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function showTimePicker() {
        setTimePickerVisibility(true);
    };

    function hideTimePicker() {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        let time = date.toTimeString();
        time = time.substring(5, -5);
        hideTimePicker();
        setTime(time);
    }

    function filterContainer() {
        if(activated){
            setActivated(false);
            setIcon("chevron-down");
        }else{
            setActivated(true);
            setIcon("chevron-up");
        }
    }

    useEffect(()=>{
        let subjectReceive = subject;
        let weekDayReceive = weekDay;
        let timeReceive = time;

        if(subject === 'Selecione') {
            subjectReceive = '';
            setSubject('');
        }
        if(weekDay === 'Selecione') {
            weekDayReceive = '';
            setWeekDay('');
        }

        async function asyncFunction() {
            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day: weekDay,
                    time
                }
            });
            setTeachers(response.data);
        }
        asyncFunction();

        console.log(subjectReceive, weekDayReceive, timeReceive);
    }, [subject, weekDay, time]);

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis">
                <View style={styles.pageHeaderContent}>
                    <TouchableOpacity activeOpacity={.5} style={styles.filterButton} onPress={filterContainer}>
                        <Feather name="filter" size={24} color="#04D361" />
                        <Text style={styles.filterText}>Filtrar por dia, hora e matéria</Text>
                        <Feather name={icon} size={24} color="#A380F6" />
                    </TouchableOpacity>
                    {activated && (<View style={styles.searchForm}>
                        <Text style={styles.label}>Máteria</Text>
                        <View style={styles.select}>
                        <Picker style={styles.timeText} selectedValue={subject} onValueChange={(itemValue)=>setSubject(itemValue.toString())}>
                            <Picker.Item value='' label='Selecione' />
                            <Picker.Item value='Artes' label='Artes' />
                            <Picker.Item value='Biologia' label='Biologia' />
                            <Picker.Item value='Educação Física' label= 'Educação Física' />
                            <Picker.Item value='Filosofia' label='Filosofia' />
                            <Picker.Item value='Física' label='Física' />
                            <Picker.Item value='Geografia' label='Geografia' />
                            <Picker.Item value='História' label='História' />
                            <Picker.Item value='Informática' label='Informática' />
                            <Picker.Item value='Língua Portuguesa' label= 'Língua Portuguesa' />
                            <Picker.Item value='Língua Inglesa' label= 'Língua Inglesa' />
                            <Picker.Item value='Língua Espanhola' label= 'Língua Espanhola' />
                            <Picker.Item value='Literatura' label='Literatura' />
                            <Picker.Item value='Matemática' label='Matemática' />
                            <Picker.Item value='Química' label='Química' />
                            <Picker.Item value='Sociologia' label='Sociologia' />
                        </Picker>
                        </View>
                        <View style={styles.selectGroup}>
                            <View style={styles.selectBlockWeekDay}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <View style={styles.select}>
                                    <Picker style={styles.timeText} selectedValue={weekDay} onValueChange={(itemValue)=>setWeekDay(itemValue.toString())}>
                                        <Picker.Item value='' label='Selecione' />
                                        <Picker.Item value='0' label='Domingo' />
                                        <Picker.Item value='1' label='Segunda-feira' />
                                        <Picker.Item value='2' label='Terça-feira' />
                                        <Picker.Item value='3' label='Quarta-feira' />
                                        <Picker.Item value='4' label='Quinta-feira' />
                                        <Picker.Item value='5' label='Sexta-feira' />
                                        <Picker.Item value='6' label='Sábado' />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.selectBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TouchableOpacity
                                 activeOpacity={.8}
                                 style={styles.select}
                                 onPress={showTimePicker}
                                 onLongPress={()=>setTime('')}
                                >
                                    <Text style={styles.timeText}>{(time==='')?'Selecione':time}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isTimePickerVisible}
                                    date={new Date()}
                                    mode="time"
                                    onConfirm={handleConfirm}
                                    onCancel={hideTimePicker}
                                />
                            </View>
                        </View>
                    </View>)}
                </View>
            </PageHeader>
            <ScrollView
             style={{marginTop: -40}}
             contentContainerStyle={{
                 paddingHorizontal: 16,
                 paddingBottom: 24
             }}
            >
                {(teachers.length > 0)? 
                    (teachers.map((teacher: Teacher)=>(
                        <TeacherItem key={teacher.id} teacher={teacher}/>
                    )))
                    :
                    <View style={styles.emptyAlert}>
                        <Text style={styles.emptyAlertText}>Nenhum proffy encontrado</Text>
                        <Feather name="frown" size={20} color="#d4c2ff" />
                    </View>
                }
            </ScrollView>
        </View>
    );
}
export default TeacherList;