import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


export default function MarksPage() {
    const subject = () => {
        let content = [];
        for (let i = 0; i < 20; i++) {
            content.push(
                <View style={styles.tableLine} key={i}>
                    <View style={styles.column1}>
                        <Text>Предмет</Text>
                    </View>
                    <View style={styles.column2}>
                        <Text>Оценка</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text>Препод</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{marginTop:5}}>
                {content}
            </View>
        )
    }

    return (
        <View>
            <View>
                <Text style={{fontSize: 20}}>Моя успеваемость</Text>
                <LineChart
                    data={{
                        labels: ["ЭС", "КТ1", "КТ2", "ЭС", "КТ1", "КТ2"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 5,
                                    Math.random() * 5,
                                    Math.random() * 5,
                                    Math.random() * 5,
                                    Math.random() * 5,
                                    Math.random() * 5,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 25} // from react-native
                    height={vh(30)}
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
                />
            </View>

            {/*{subject()}*/}
            <View style={styles.container}>
                <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                    {subject()}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: vh(45),
    },
    tableLine: {
        marginTop: -1,
        borderColor: '#1177d1',
        borderWidth: 1,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    column1: {
        flex: 1,
        borderRightColor: '#1177d1',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
    },

});

