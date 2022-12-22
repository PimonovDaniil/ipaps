import MainPage from "./components/MainPage";
import {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {vh, vw} from "react-native-expo-viewport-units";
import Loader from "react-native-modal-loader";
import {getAttendance, getGrades, getTimetable} from "./backend/Parser";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [showMainPage, setShowMainPage] = useState(false);
    const [name, onChangeName] = useState("");
    const [surname, onChangeSurname] = useState("");
    const [group, onChangeGroup] = useState("");
    const [attendance, setAttendance] = useState("");
    const [timetable, setTimetable] = useState("");
    const [grades, setGrades] = useState("");

    useEffect(() => {
        (async function () {
            let memName = JSON.parse(await SecureStore.getItemAsync("name"));
            if (memName !== null) { //данные есть
                setIsLoading(true);
                let memSurname = JSON.parse(await SecureStore.getItemAsync("surname"));
                let memGroup = JSON.parse(await SecureStore.getItemAsync("group"));
                getAttendance(memName, memSurname, memGroup).then(r1 => {
                    setAttendance(JSON.stringify(r1, null, 2));
                    getGrades(memName, memSurname, memGroup,0).then(r2 => {
                        setGrades(JSON.stringify(r2, null, 2));
                        getTimetable("", 0, memGroup).then(r3 => {
                            setTimetable(JSON.stringify(r3, null, 2));
                            SecureStore.setItemAsync("attendance", JSON.stringify(attendance)).then(r => {
                            });
                            SecureStore.setItemAsync("timetable", JSON.stringify(timetable)).then(r => {
                            });
                            SecureStore.setItemAsync("grades", JSON.stringify(grades)).then(r => {
                            });
                            setIsLoading(false);
                            setShowMainPage(true);
                        })
                    })
                })
            }
        })();
    }, []);

    if (showMainPage) {
        return (
            <MainPage/>
        );
    } else {
        return (
            <View style={styles.container}>
                <Loader loading={isLoading} color="#297fb8"/>
                <View>
                    <Text style={{fontSize: 20}}>Авторизация</Text>
                </View>
                <View>
                    <TextInput
                        placeholder="Имя"
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                    />
                    <TextInput
                        placeholder="Фамилия"
                        style={styles.input}
                        onChangeText={onChangeSurname}
                        value={surname}
                    />
                    <TextInput
                        placeholder="Номер группы"
                        style={styles.input}
                        onChangeText={onChangeGroup}
                        value={group}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    console.log(name);
                    console.log(surname);
                    console.log(group);

                    getAttendance(name, surname, group).then(r1 => {
                        let getAttendance = JSON.stringify(r1, null, 2);
                        if (getAttendance === "false") {
                            alert("Неверные данные");
                        } else {

                            setIsLoading(true);
                            setAttendance(getAttendance);
                            getGrades(name, surname, group,0).then(r2 => {
                                setGrades(JSON.stringify(r2, null, 2));
                                getTimetable("", 0, group).then(r3 => {
                                    setTimetable(JSON.stringify(r3, null, 2));
                                    SecureStore.setItemAsync("attendance", JSON.stringify(attendance)).then(r => {
                                    });
                                    SecureStore.setItemAsync("timetable", JSON.stringify(timetable)).then(r => {
                                    });
                                    SecureStore.setItemAsync("grades", JSON.stringify(grades)).then(r => {
                                    });
                                    SecureStore.setItemAsync("name", JSON.stringify(name)).then(r => {
                                    });
                                    SecureStore.setItemAsync("surname", JSON.stringify(surname)).then(r => {
                                    });
                                    SecureStore.setItemAsync("group", JSON.stringify(group)).then(r => {
                                    });
                                    setIsLoading(false);
                                    setShowMainPage(true);
                                })
                            })
                        }
                    })
                }}>
                    <View style={styles.enterButton}>
                        <Text style={{color: 'white'}}>Войти</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(100)
    },
    input: {
        borderColor: "#1177d1",
        margin: 12,
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        width: vw(60),
    },
    enterButton: {
        backgroundColor: '#1177d1',
        padding: 20,
        width: vw(35),
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    }
});