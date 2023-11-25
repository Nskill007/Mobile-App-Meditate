import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated as Animated2, TouchableHighlight, Vibration} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue, withDelay,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import { useSessionContext } from '../context/home_context';

const {width, height} = Dimensions.get('window');
const circle_length = 900;
const radius = circle_length / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);


export default function CircleAnimation (){

    const scaleAnim = useRef(new Animated2.Value(0.5)).current;
    const fadeInAndOut = useRef(new Animated2.Value(1)).current;
    const { sessionType, sessionLength } = useSessionContext()
    const progress = useSharedValue(1);
    const breathingTypes = ["Breathe In", "Hold", "Breathe Out"];
    const [breathingIndex, setBreathingIndex] = useState(0);

    const animateIncreaseTextSize = () => {
        Animated2.timing(
            scaleAnim,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true
            }
        ).start();
    }

    const animateDecreaseTextSize = () => {
        Animated2.timing(
            scaleAnim,
            {
                toValue: 0.5,
                duration: 5000,
                useNativeDriver: true
            }
        ).start();
    }

    const animateFadeIn = () => {
        Animated2.timing(
            fadeInAndOut,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }

    const animateFadeOut = () => {
        Animated2.timing(
            fadeInAndOut,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }


    useEffect(() =>{
        progress.value = withRepeat(
            withSequence(
                withTiming(0, {duration: 5000}),
                withDelay(5000,
                    withTiming(1, {duration: 5000}))
            ),
            (sessionLength*60) / 15);

    }, []);

    useEffect(() => {
        animateIncreaseTextSize();
        const intervalTextAnimation = setInterval(() => {
            setBreathingIndex(prevIndex => {
                if(prevIndex === breathingTypes.length -1){
                    animateIncreaseTextSize();
                    return 0;
                }
                if(prevIndex === 1){
                    animateDecreaseTextSize();
                }
                return prevIndex + 1;
            })
            if(sessionType !== "Silent"){
                Vibration.vibrate();
            }
            animateFadeIn();
        }, 5000);
        setTimeout(() => {
            clearInterval(intervalTextAnimation);
        }, (sessionLength * 60000))


        setTimeout(() => {
            animateFadeOut();
            const intervalTextFade = setInterval(() => {
                animateFadeOut();
            }, 5000);

            setTimeout(() => {
                clearInterval(intervalTextFade);
            }, (sessionLength * 60000))
        }, 4500)
        return ()=>{
            console.log("returning")
            clearInterval(intervalTextAnimation);
        }
    }, []);


    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circle_length * progress.value
    }));

    return (

        <Svg style={styles.svgContainer}>
            <Circle
                cx={width / 2.2}
                cy={height / 3.5}
                r={radius}
                stroke='#404258'
                strokeWidth={27}
            />
            <AnimatedCircle
                cx={width / 2.2}
                cy={height / 3.5}
                r={radius}
                stroke='#4974a5'
                strokeWidth={13.5}
                strokeDasharray={circle_length}
                animatedProps={animatedProps}
                strokeLinecap={"round"}
            />
            <View style={styles.breathView}>
                <Animated2.Text style={[styles.breathText,{opacity: fadeInAndOut} ,{transform:[{scale:scaleAnim}]}]}>{breathingTypes[breathingIndex]}</Animated2.Text>
            </View>
        </Svg>
    )
}
const styles = StyleSheet.create({
    svgContainer: {
        position: 'absolute',
    },

    breathView: {
        position: "absolute",
        width: 250,
        height: 250,
        top: 106.5,
        left: 45,

    },
    breathText: {
        top: 85,
        fontSize: 50,
        textAlign: "center",
        color:'#DDD6D6',
    }
});

