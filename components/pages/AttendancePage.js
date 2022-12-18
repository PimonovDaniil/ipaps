import React, {Component, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import {LineChart} from "react-native-chart-kit";
import {Picker} from "@react-native-picker/picker";



export default function AttendancePage() {

    const histogram = () => {
        let subjects = [["Информационная безопасность", 84],
            ["Основы разработки программного обеспечения", 95],
            ["Параллельное программирование", 76],
            ["Проектирование и техническое сопровождение компьютерных сетей", 80],
            ["Распределённые вычислительные системы", 81],
            ["Системы цифровой обработки сигналов", 84],
            ["Теория языков программирования и методы трансляции", 75],
            ["Функциональное и логическое программирование", 73],
        ];

        let content = [];
        for (let i = 0; i < subjects.length; i++) {
            content.push(
                <View style={[(i % 2 !== 0) ? {backgroundColor: '#D3D3D3'} : {}, {marginTop: 10, paddingBottom: 5}]}
                      key={i}>
                    <View style={{paddingHorizontal: 15}}>
                        <Text>{subjects[i][0]}</Text>
                        <View style={styles.line}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View
                                    style={{backgroundColor: '#1177d1', flex: subjects[i][1]}}/>
                                <View style={{
                                    flex: 100 - subjects[i][1], backgroundColor: '#f2f3f4'
                                }}/>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View>
                {content}
            </View>
        )
    }

    const absenteeism = () => {
        let subjects = [
            "Распределенные вычислительные системы (Лаб. раб.) 09.12.2022",
            "Параллельное программирование (Лаб. раб.) 07.12.2022",
            "Параллельное программирование (Лаб. раб.) 07.12.2022",
            "Теория языков программирования и методы трансляции (Практ.) 05.12.2022",
        ];

        let content = [];
        for (let i = 0; i < subjects.length; i++) {
            content.push(
                <View style={[(i % 2 !== 0) ? {backgroundColor: '#D3D3D3'} : {}, {marginTop: 10, paddingBottom: 5}]}
                      key={i}>
                    <View>
                        <Text>{"• " + subjects[i]}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View>
                {content}
            </View>
        )
    }

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: 15}}>
                    <Picker
                        ref={pickerRef}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Прошлая неделя" value="Прошлая неделя"/>
                        <Picker.Item label="С начала семестра" value="С начала семестра"/>
                        <Picker.Item label="Всё" value="Всё"/>
                    </Picker>

                    <View>
                        <Text style={{fontSize: 20}}>Посещаемость по дням</Text>
                        <LineChart
                            data={{
                                labels: ["5. Дек", "6. Дек", "7. Дек", "8. Дек", "9. Дек", "10. Дек"],
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - 25} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="%"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#1177d1",
                                backgroundGradientFrom: "#118bd1",
                                backgroundGradientTo: "#1194d1",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#1161d1"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <Text style={{fontSize: 20}}>Посещаемость по дисциплинам</Text>
                </View>
                {histogram()}
                <View style={{paddingHorizontal: 15}}>
                    <Text style={{fontSize: 20, marginTop: 10}}>Пропуски занятий</Text>
                    {absenteeism()}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: vh((80*Dimensions.get('window').height)/776),
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        height: 50,
    },
});

