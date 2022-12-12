import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function MarksPage() {
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
                    width={Dimensions.get("window").width-25} // from react-native
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
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timetable: {
        marginTop:20,
        borderTopColor: '#1177d1',
        borderTopWidth: 1,
    },

});
