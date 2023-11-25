import { Text, StyleSheet, ScrollView, View } from "react-native";

const List =  (props) => {
    return (
        <ScrollView>
            {props.array.map((item, index) => {
                return (<Text key={index} style={styles.elementText}><Text style={styles.boldText}>{item.name}</Text>{'\n'}{item.address}</Text>);
            })}
        </ScrollView>
    );
};

export default List;

const styles = StyleSheet.create({
    list: {
    },
    elementText: {
        fontSize: 18,
        margin: 5,
        marginHorizontal: 15,
        backgroundColor: '#EEECEC',
        borderColor:'#0000',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold', 
        fontSize: 18,
        margin: 5,
        marginHorizontal: 15,
        backgroundColor: '#EEECEC',
        borderColor:'#0000',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
    },

});