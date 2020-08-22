import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    pageHeaderContent: {
        marginTop: -16
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginHorizontal: -8,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#9871F5'
    },
    filterText: {
        color: '#D4C2FF',
        fontFamily: 'Archivo_400Regular',
        fontSize: 16
    },
    searchForm: {
        marginBottom: 40
    },
    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },
    select: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        height: 54,
        paddingHorizontal: 16
        
    },
    timeText: {
        color: '#C1BCCC',
        fontSize: 16
    },
    selectGroup: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectBlockWeekDay: {
        flex: 1,
        marginRight: 8
    },
    selectBlock: {

    }
});

export default styles;