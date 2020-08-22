import React from 'react';
import { View, Image, Text }from 'react-native'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

interface TeacherItemProps {
    name?: string,
    avatar?: string,
    subject?: string,
    bio?: string,
    price?: string,
    whatsapp?: string,
    favorite?: boolean
}

const TeacherItem:React.FC<TeacherItemProps> = ({name, avatar, subject, bio, price, whatsapp, favorite}) => {

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                 style={styles.avatar}
                 source={{uri:'http://github.com/FernandoHeisser.png'}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Fernando Heisser</Text>
                    <Text style={styles.subject}>Informática</Text>
                </View>
            </View>
            <Text style={styles.bio}>
            Entusiasta das melhores tecnologias de química avançada.
            Apaixonado por explodir coisas em laboratório e por mudar 
            a vida das pessoas através de experiências. Mais de 200.000 
            pessoas já passaram por uma das minhas explosões.
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ 20,00</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton style={favorite?styles.unfavoriteButton:styles.favoriteButton}>
                        {
                        favorite?
                            <Image source={unfavoriteIcon}></Image>
                            :
                            <Image source={heartOutlineIcon}></Image>
                        }
                    </RectButton>
                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon}></Image>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}
export default TeacherItem;