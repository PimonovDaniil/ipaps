import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import arrow from '../../assets/icons8-двойная-стрелка-вправо-32.png';
import {vh} from "react-native-expo-viewport-units";
export default function HomePage() {
    return (
        <View style={{paddingHorizontal: 15, height: vh((80*Dimensions.get('window').height)/776)}}>
            <TouchableOpacity>
                <View style={styles.timetable}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20}}>Ближайшая пара</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 22}}>ОРПО</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>Лабораторная работа</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>ф 401</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 14}}>Лукьянов А.К.</Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: '25%'}}>
                        <Image source={arrow} style={{
                            width: 32,
                            height: 32,
                            marginTop: 25,
                        }}></Image>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.gpa}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20}}>Средний балл</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>Средний балл за КТ </Text>
                        <Text style={{fontSize: 18}}>или экзамен </Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: '25%'}}>
                        <Image source={arrow} style={{
                            width: 32,
                            height: 32,
                            marginTop: 25,
                        }}></Image>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.attendance}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20}}>Посещаемость</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>Процент посещаемости за </Text>
                        <Text style={{fontSize: 18}}>последнюю неделю: 0% </Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: '25%'}}>
                        <Image source={arrow} style={{
                            width: 32,
                            height: 32,
                            marginTop: 25,
                        }}></Image>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.duty}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20}}>Долги</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>Самый приоритетный </Text>
                        <Text style={{fontSize: 18}}>долг: ОРПО </Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: '25%'}}>
                        <Image source={arrow} style={{
                            width: 32,
                            height: 32,
                            marginTop: 25,
                        }}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    timetable: {
        marginTop:20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },
    gpa: {
        marginTop:20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },
    attendance: {
        marginTop:20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },
    duty: {
        marginTop:20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },
});
