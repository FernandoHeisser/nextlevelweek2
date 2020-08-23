import React, { useEffect, useState } from 'react';
import { View, ScrollView }from 'react-native'

import api from '../../services/api';
import TeacherItem, { Teacher } from '../../components/TeacherItem/index';
import PageHeader from '../../components/PageHeader';
import styles from './styles';

function Favorites() {

    const [teachers, setTeachers] = useState([]);

    useEffect(()=>{
        async function asyncFunction() {
            const response = await api.get('classes', {
                params: {
                    subject:'',
                    week_day:'',
                    time:''
                }
            });
            setTeachers(response.data);
        }
        asyncFunction();
    }, []);

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
             style={{marginTop: -40}}
             contentContainerStyle={{
                 paddingHorizontal: 16,
                 paddingBottom: 24
             }}
            >
                {teachers.map((teacher: Teacher)=>(
                    <TeacherItem key={teacher.id} teacher={teacher} favorite={true}/>
                ))}
            </ScrollView>
        </View>
    );
}
export default Favorites;