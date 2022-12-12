import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import logo from './assets/tusur_logo.png';
// Tab ICons...
import home from './assets/home.png';
import timetable from './assets/icons8-вахтенный-журнал-80.png';
import notifications from './assets/bell.png';
import settings from './assets/settings.png';
import logout from './assets/logout.png';
// Menu
import menu from './assets/menu.png';
import close from './assets/close.png';

// Photo
import photo from './assets/photo.jpg';
import MenuAnimation from "./components/MenuAnimation";
import HomePage from "./components/pages/HomePage";
import TimetablePage from "./components/pages/TimetablePage";

export default function App() {
    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);

    // Animated Properties...

    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={styles.container}>

            <View style={{justifyContent: 'flex-start', padding: 15}}>
                <Image source={logo} style={{
                    width: 120,
                    height: 30,
                    marginTop: 25,
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>Пимонов Даниил</Text>

                <Text style={{
                    marginTop: 6,
                    color: 'white'
                }}>439-3 группа</Text>

                <View style={{flexGrow: 1, marginTop: 50}}>
                    {
                        // Tab Bar Buttons....
                    }

                    {TabButton(currentTab, setCurrentTab, "Home", home, showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Timetable", timetable, showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Notifications", notifications, showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings, showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset)}

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
                </View>

            </View>

            {
                // Over lay View...
            }

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderRadius: showMenu ? 15 : 0,
                // Transforming View...
                transform: [
                    {scale: scaleValue},
                    {translateX: offsetValue}
                ]
            }}>

                {
                    // Menu Button...
                }

                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <MenuAnimation showMenu={showMenu} setShowMenu={setShowMenu} scaleValue={scaleValue}
                                   offsetValue={offsetValue} closeButtonOffset={closeButtonOffset} title={false}>
                        <Image source={showMenu ? close : menu} style={{
                            width: 20,
                            height: 20,
                            tintColor: 'black',
                            marginTop: 40,

                        }}></Image>
                    </MenuAnimation>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'black',
                        paddingTop: 20
                    }}>{currentTab}</Text>
                    {currentTab==='Home' && <HomePage/>}
                    {currentTab==='Timetable' && <TimetablePage/>}
                </Animated.View>

            </Animated.View>

        </SafeAreaView>
    );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image, showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title === "LogOut") {
                // Do your Stuff...
            } else {
                setCurrentTab(title);
            }
        }}>
            <MenuAnimation showMenu={showMenu} setShowMenu={setShowMenu} scaleValue={scaleValue}
                           offsetValue={offsetValue} closeButtonOffset={closeButtonOffset} title={title}
                           setCurrentTab={setCurrentTab}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    paddingVertical: 8,
                    backgroundColor: currentTab === title ? 'white' : 'transparent',
                    paddingLeft: 13,
                    paddingRight: 35,
                    borderRadius: 8,
                    marginTop: 15
                }}>

                    <Image source={image} style={{
                        width: 25, height: 25,
                        tintColor: currentTab === title ? "#1177d1" : "white"
                    }}></Image>

                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingLeft: 15,
                        color: currentTab === title ? "#1177d1" : "white"
                    }}>{title}</Text>
                </View>
            </MenuAnimation>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1177d1',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});