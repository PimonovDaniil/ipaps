import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import * as SecureStore from "expo-secure-store";


export default function TimetablePage() {
    const [internetCheck, setInternetCheck] = useState(0);
    const [timetable, setTimetable] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        (async function () {
            setTimetable(JSON.parse(await SecureStore.getItemAsync("timetable")));
            console.log(JSON.stringify(JSON.parse(await SecureStore.getItemAsync("timetable"))[0], null, 2))
            setIsLoad(true);
        })();
    }, [internetCheck]);

    const [isDayOpen, setIsDayOpen] = useState([false, false, false, false, false, false]);

    const subjects = (list) => {
        let content = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i]["isReal"]) {
                content.push(
                    <View style={{borderBottomColor: "#1177d1", borderBottomWidth: 1}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 22}}>{list[i]["name"]}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 16}}>{list[i]["lessonType"]}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 16}}>{list[i]["classroom"]}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14}}>{list[i]["teacher"]}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 14}}>{list[i]["timeStart"] + " - " + list[i]["timeEnd"]}</Text>
                        </View>
                    </View>
                );
            }

        }
        return (
            <View style={{marginLeft: 30}}>
                {content}
            </View>
        )
    }
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
                            <Text style={{fontSize: 20}}>{days[i]}</Text>
                        </View>
                    </View>
                    {/*  TODO тута сделать волшебное появление самого расписания из дня  */}
                    {isDayOpen[i] === true && subjects(timetable[0][i])}
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

        <View style={{paddingHorizontal: 15, height: vh((80 * Dimensions.get('window').height) / 776)}}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                {isLoad && days()}
            </ScrollView>
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
