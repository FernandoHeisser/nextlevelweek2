import React from 'react';
import { View, Image, Text, Linking }from 'react-native'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

export interface Teacher {
    id: number,
    user_id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}
interface TeacherItemProps {
    favorite?: boolean,
    teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({teacher, favorite}) => {
    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                 style={styles.avatar}
                 source={{uri:teacher.avatar}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
            {teacher.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost.toFixed(2).replace('.', ',')}</Text>
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
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon}></Image>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}
export default TeacherItem;