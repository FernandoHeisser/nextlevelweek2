import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView }from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import styles from './styles';

function Favorites() {
    const [teachers, setTeachers] = useState([]);

    useFocusEffect(()=>{
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                setTeachers(favoritedTeachers);
            }
        });
    });

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
                    <TeacherItem key={teacher.id} teacher={teacher} favorite/>
                ))}
            </ScrollView>
        </View>
    );
}
export default Favorites;