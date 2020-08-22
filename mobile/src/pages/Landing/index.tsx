import React from 'react';
import { View, Text, Image, TouchableOpacity }from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {

    const { navigate } = useNavigation();

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses');
    }
    function handleNavigateToGiveStudyPages() {
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg} />
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <RectButton 
                 style={[styles.button, styles.buttonPrimary]}
                 onPress={handleNavigateToGiveStudyPages}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton 
                 style={[styles.button, styles.buttonSecondary]}
                 onPress={handleNavigateToGiveClassesPage}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar aula</Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>
                Total de 285 conexões realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}
export default Landing;