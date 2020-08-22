import React from 'react';
import { View, ScrollView }from 'react-native'

import TeacherItem from '../../components/TeacherItem/index';
import PageHeader from '../../components/PageHeader';
import styles from './styles';

function Favorites() {
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
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
                <TeacherItem favorite={true}/>
            </ScrollView>
        </View>
    );
}
export default Favorites;