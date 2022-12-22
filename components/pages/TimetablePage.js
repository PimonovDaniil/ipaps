import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {vh} from "react-native-expo-viewport-units";



export default function TimetablePage() {
    const [internetCheck, setInternetCheck] = useState(0);
    useEffect(() => {
        //code
    }, [internetCheck]);

    const [isDayOpen, setIsDayOpen] = useState([false, false, false, false, false, false]);
    const days = () => {
        let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        let content = [];
        for (let i = 0; i < 6; i++) {
            content.push(
                <TouchableOpacity key={i} onPress={() => {
                    let mem = isDayOpen;
                    mem[i] = !mem[i];
                    setIsDayOpen(mem);
                    setInternetCheck(internetCheck + 1);
                }}>
                    <View style={styles.timetable}>
                        <View style={{marginBottom: 10}}>
                            <Text style={{fontSize: 20}}>{days[i]} (11.12.2022)</Text>
                        </View>
                    </View>
                    {/*  TODO тута сделать волшебное появление самого расписания из дня  */}
                    {isDayOpen[i] === true &&
                        <View>
                            <Text>Text</Text>
                        </View>}
                </TouchableOpacity>
            );
        }
        return (
            <View>
                {content}
            </View>
        )
    }

    return (
        <View style={{paddingHorizontal: 15, height: vh((80*Dimensions.get('window').height)/776)}}>
            {days()}
        </View>
    );
};

const styles = StyleSheet.create({
    timetable: {
        marginTop: 20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },
});
