import React, {Component, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import {Picker} from '@react-native-picker/picker'
import {
    LineChart
} from "react-native-chart-kit";
import * as SecureStore from "expo-secure-store";
import {getGrades} from "../../backend/Parser";
import Loader from "react-native-modal-loader";


export default function MarksPage() {
    const [grades, setGrades] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [currentCurse, setCurrentCurse] = useState();
    const [selectedCurse, setSelectedCurse] = useState();
    const [isLoad, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [graph, setGraph] = useState([]);
    const [graphlable, setGraphlable] = useState([]);
    const [isGraphUpdate, setIsGraphUpdate] = useState(true);
    useEffect(() => {
        (async function () {
            setGrades(JSON.parse(await SecureStore.getItemAsync("grades")));
            console.log(JSON.stringify(JSON.parse(await SecureStore.getItemAsync("grades"))[2], null, 2))
            setCurrentCurse(JSON.parse(await SecureStore.getItemAsync("grades"))[2]);
            setSelectedCurse(JSON.parse(await SecureStore.getItemAsync("grades"))[2]);
            setLoad(true);
        })();
    }, []);

    const subject = () => {
        let k1 = 0;
        let k2 = 0;
        let es = 0;
        let k12 = 0;
        let k22 = 0;
        let es2 = 0;
        let l1 = 0;
        let l2 = 0;
        let l3 = 0;
        let l4 = 0;
        let l5 = 0;
        let l6 = 0;
        let content = [];
        for (let k = 0; k < grades[0].length; k++) {
            content.push(
                <Text style={{fontSize: 20, marginTop: 20, marginBottom: 10}}>{grades[0][k]["name"]}</Text>
            );
            if (k === 0) {
                content.push(
                    <View
                        style={[styles.tableLine]}
                        key={0}>
                        <View style={styles.column12}>
                            <Text>Предмет</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text>КТ1</Text>
                        </View>
                        <View style={styles.column3}>
                            <Text>КТ2</Text>
                        </View>
                        <View style={styles.column4}>
                            <Text>ЭС</Text>
                        </View>
                    </View>
                );
            }

            for (let i = 0; i < grades[0][k]["disciplines"].length; i++) {
                let kt_1 = "-";
                let kt_2 = "-";
                let exam = "-";
                for (let j = 0; j < grades[0][k]["disciplines"][i]["marks"].length; j++) {
                    if (grades[0][k]["disciplines"][i]["marks"][j]["type"] === "kt_1") {
                        kt_1 = grades[0][k]["disciplines"][i]["marks"][j]["value"];
                        if (k === 0) {
                            k1 += kt_1;
                            l1++;
                        } else {
                            k12 += kt_1;
                            l4++;
                        }
                    } else if (grades[0][k]["disciplines"][i]["marks"][j]["type"] === "kt_2") {
                        kt_2 = grades[0][k]["disciplines"][i]["marks"][j]["value"];
                        if (k === 0) {
                            k2 += kt_2;
                            l2++;
                        } else {
                            k22 += kt_2;
                            l5++;
                        }
                    } else if (grades[0][k]["disciplines"][i]["marks"][j]["type"] === "qualification") {
                        exam = grades[0][k]["disciplines"][i]["marks"][j]["value"];
                    } else if (grades[0][k]["disciplines"][i]["marks"][j]["type"] === "qualification_with_mark" || grades[0][k]["disciplines"][i]["marks"][j]["type"] === "exam") {
                        exam = grades[0][k]["disciplines"][i]["marks"][j]["value"];
                        if (k === 0) {
                            es += exam;
                            l3++;
                        } else {
                            es2 += exam;
                            l6++;
                        }
                    }
                }
                content.push(
                    <View
                        style={[styles.tableLine, grades[0][k]["disciplines"][i]["needToStudy"] ? {} : {backgroundColor: "#c7e2ff"}]}
                        key={i}>
                        <View style={styles.column1}>
                            <Text>{grades[0][k]["disciplines"][i]["name"]}</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text>{kt_1}</Text>
                        </View>
                        <View style={styles.column3}>
                            <Text>{kt_2}</Text>
                        </View>
                        <View style={styles.column4}>
                            <Text>{exam}</Text>
                        </View>
                    </View>
                );
            }
        }
        if(isGraphUpdate){
            let memGraph;
            let memGraphlable;
            if (es2 !== 0) {
                memGraph = [k1 / l1, k2 / l2, es / l3, k12 / l4, k22 / l5, es2 / l6];
                memGraphlable = ["KT1", "КТ2", "ЭС", "KT1", "КТ2", "ЭС"];
            } else if (k22 !== 0) {
                memGraph = [k1 / l1, k2 / l2, es / l3, k12 / l4, k22 / l5];
                memGraphlable = ["KT1", "КТ2", "ЭС", "KT1", "КТ2"];
            } else if (k12 !== 0) {
                memGraph = [k1 / l1, k2 / l2, es / l3, k12 / l4];
                memGraphlable = ["KT1", "КТ2", "ЭС", "KT1"];
            } else if (es !== 0) {
                memGraph = [k1 / l1, k2 / l2, es / l3];
                memGraphlable = ["KT1", "КТ2", "ЭС"];
            } else if (k2 !== 0) {
                memGraph = [k1 / l1, k2 / l2];
                memGraphlable = ["KT1", "КТ2"];
            } else if (k1 !== 0) {
                memGraph = [k1 / l1];
                memGraphlable = ["KT1"];
            }
            setGraph(memGraph);
            setGraphlable(memGraphlable);
            setIsGraphUpdate(false)
        }

        return (
            <View style={{marginTop: 5}}>
                {content}
            </View>
        )
    }

    const setPicker = () => {
        let content = [];
        for (let i = currentCurse; i >= 1; i--) {
            content.push(
                <Picker.Item label={"Курс " + String(i)} value={String(i)}/>
            );
        }
        return (
            <Picker
                ref={pickerRef}
                selectedValue={selectedLanguage}
                onValueChange={async (itemValue, itemIndex) => {
                    setIsLoading(true)
                    let memName = JSON.parse(await SecureStore.getItemAsync("name"));
                    let memSurname = JSON.parse(await SecureStore.getItemAsync("surname"));
                    let memGroup = JSON.parse(await SecureStore.getItemAsync("group"));
                    getGrades(memName, memSurname, memGroup, itemValue).then(r => {
                        setGrades(r);
                        setIsLoading(false);
                        console.log(JSON.stringify(r, null, 2))
                        setIsGraphUpdate(true);
                    });
                    setSelectedLanguage(itemValue);
                }
                }>
                {content}
            </Picker>
        )
    }

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return (
        <View style={styles.container}>
            <Loader loading={isLoading} color="#297fb8"/>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={{fontSize: 20}}>Моя успеваемость</Text>
                    {isGraphUpdate === false && <LineChart
                        data={{
                            labels: graphlable,
                            datasets: [
                                {
                                    data: graph
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width - 25} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
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
                    />}
                </View>


                {setPicker()}

                {isLoad && subject()}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: vh((80 * Dimensions.get('window').height) / 776),
        paddingHorizontal: 15,
    },
    tableLine: {
        marginTop: -1,
        borderColor: '#1177d1',
        borderWidth: 1,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    column12: {
        flex: 3,
        borderRightColor: '#1177d1',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    column1: {
        flex: 3,
        borderRightColor: '#1177d1',
        borderRightWidth: 1,
    },
    column2: {
        flex: 1,
        borderRightColor: '#1177d1',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    column3: {
        flex: 1,
        borderRightColor: '#1177d1',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    column4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});