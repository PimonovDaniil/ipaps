import React, {useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import arrow from "../../assets/icons8-двойная-стрелка-вправо-32.png";


export default function AnalyticsPage() {

    return (
        <View style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={{borderBottomColor: '#1177d1', borderBottomWidth: 1}}>
                    <View style={{marginBottom: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Производительность студента</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 40}}>146%</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#1177d1', borderBottomWidth: 1}}>
                    <View style={{marginBottom: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Посещаемость 23%</Text>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <View style={styles.line}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View
                                    style={{backgroundColor: '#1177d1', flex: 23}}/>
                                <View style={{
                                    flex: 100 - 23, backgroundColor: '#f2f3f4'
                                }}/>
                            </View>
                        </View>
                    </View>
                    <Text>Топ того что надо исправить</Text>
                </View>
                <View style={{borderBottomColor: '#1177d1', borderBottomWidth: 1}}>
                    <View style={{marginBottom: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Посещаемость 23%</Text>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <View style={styles.line}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View
                                    style={{backgroundColor: '#1177d1', flex: 23}}/>
                                <View style={{
                                    flex: 100 - 23, backgroundColor: '#f2f3f4'
                                }}/>
                            </View>
                        </View>
                    </View>
                    <Text>Топ того что надо исправить</Text>
                </View>

                <View>
                    <View style={{marginBottom: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Долги</Text>
                    </View>
                    <Text>Топ того что надо исправить</Text>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        height: vh((80 * Dimensions.get('window').height) / 776),
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        height: 50,
    },

});

