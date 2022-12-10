import {StatusBar} from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function StartPage() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../assets/free-icon-menu-bar-6327921.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text>Start page!</Text>
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        justifyContent: "center",
        paddingTop: 10,
        paddingLeft: 15,
        flex: 1,
        backgroundColor: '#fbf7f7',
    },
    body: {
        flex: 10,
    }
});
