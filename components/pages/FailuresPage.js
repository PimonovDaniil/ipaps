import React, {Component, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {vh, vw} from "react-native-expo-viewport-units";
import arrow from "../../assets/icons8-двойная-стрелка-вправо-32.png";


export default function FailuresPage() {
    const failures = () => {
        let subjects = [
            "ОРПО",
            "ПП",
            "ФИЛП",
        ];

        let content = [];
        for (let i = 0; i < subjects.length; i++) {
            content.push(
                <TouchableOpacity key={i}>
                    <View style={styles.subject}>
                        <Text style={{fontSize: 40}}>{subjects[i]}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <View>
                {content}
                <View style={{borderTopColor: "white", borderTopWidth: 3, marginTop: -1}}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                {failures()}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: vh(80),
        paddingHorizontal: 15,
    },
    subject: {
        marginTop: 10,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#1177d1',
        borderBottomWidth: 1,
    },
});

