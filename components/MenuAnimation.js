import React from 'react';
import type {Node} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

//export default function MenuAnimation(showMenu, setShowMenu, scaleValue, offsetValue, closeButtonOffset) {
export default function MenuAnimation(props) {
    return (
        <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            if (props.title !== false) {
                if (props.title === "LogOut") {
                    // Do your Stuff...
                } else {
                    props.setCurrentTab(props.title);
                }
            }
            Animated.timing(props.scaleValue, {
                toValue: props.showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
            })
                .start()

            Animated.timing(props.offsetValue, {
                // YOur Random Value...
                toValue: props.showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
            })
                .start()

            Animated.timing(props.closeButtonOffset, {
                // YOur Random Value...
                toValue: !props.showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
            })
                .start()

            props.setShowMenu(!props.showMenu);
        }}>
            {props.children}
        </TouchableOpacity>
    );
};
