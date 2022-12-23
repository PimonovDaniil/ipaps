import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import {LineChart} from "react-native-chart-kit";
import {Picker} from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import {getAttendance, getGrades, getTimetable} from "../../backend/Parser";


export default function AttendancePage() {
    const [attendance, setAttendance] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [dateGraph, setDateGraph] = useState([]);
    const [dateGraphDate, setDateGraphDate] = useState([]);
    useEffect(() => {
        (async function () {
            setAttendance(JSON.parse(await SecureStore.getItemAsync("attendance")));
            //console.log(JSON.stringify(JSON.parse(await SecureStore.getItemAsync("attendance"))[0], null, 2))
            let att = JSON.parse(await SecureStore.getItemAsync("attendance"))[0];
            let date = []
            for (let key in att) {
                let msUTC = Date.parse(key);
                date.push([key, att[key]]);
            }
            date.sort(function (a, b) {
                if (Date.parse(a[0]) > Date.parse(b[0])) {
                    return 1;
                }
                if (Date.parse(a[0]) < Date.parse(b[0])) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            })
            let dateValue = []
            for (let  i = 0; i < date.length; i++) {
                dateValue.push(date[i][1]);
            }
            setDateGraph(dateValue);
            setDateGraphDate([date[0][0], date[Math.floor(date.length/2)][0],date[date.length-1][0]]);
            setIsLoad(true);
        })();
    }, []);

    const histogram = () => {
        let content = [];
        for (let i = 0; i < attendance[1].length; i++) {
            content.push(
                <View style={[(i % 2 !== 0) ? {backgroundColor: '#D3D3D3'} : {}, {marginTop: 10, paddingBottom: 5}]}
                      key={i}>
                    <View style={{paddingHorizontal: 15}}>
                        <Text>{attendance[1][i][0]}</Text>
                        <View style={styles.line}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View
                                    style={{backgroundColor: '#1177d1', flex: attendance[1][i][1]["value"]}}/>
                                <View style={{
                                    flex: 100 - attendance[1][i][1]["value"], backgroundColor: '#f2f3f4'
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

        let content = [];
        for (let i = 0; i < attendance[2].length; i++) {
            content.push(
                <View style={[(i % 2 !== 0) ? {backgroundColor: '#D3D3D3'} : {}, {marginTop: 10, paddingBottom: 5}]}
                      key={i}>
                    <View>
                        <Text>{"• " + attendance[2][i]["name"] + attendance[2][i]["date"]}</Text>
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
                {isLoad && <View>
                    <View style={{paddingHorizontal: 15}}>
                        <View>
                            <Text style={{fontSize: 20}}>Посещаемость по дням</Text>
                            <LineChart
                                data={{
                                    labels: dateGraphDate,
                                    datasets: [
                                        {
                                            data: dateGraph
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
                </View>}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: vh((80 * Dimensions.get('window').height) / 776),
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        height: 50,
    },
});

