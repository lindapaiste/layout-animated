import {Animated} from "react-native";
import {useEffect, useRef} from "react";
import {TimerSettings} from "./types";

/**
 * takes props translateX and translateY which change suddenly to new values
 * and returns animated values translateX and translateY for a smooth transition
 * according to the optional timer settings
 *
 * make translate X and Y both optional so that one only one can be animated
 * without needing to explicitly set the other to 0
 */
export type Props = {
    translateX?: number;
    translateY?: number;
} & TimerSettings;

export interface Returns {
    translateX: Animated.Value;
    translateY: Animated.Value;
}

export default ({translateX = 0, translateY = 0, duration, easing, delay, isInteraction, onEnd = () => {}}: Props): Returns => {
    /**
     * translation is ok to animate with native driver, so can assign values directly
     * and do not need to store the initial value or interpolate the results
     */

    const animX = useRef(new Animated.Value(translateX)).current;

    const animY = useRef(new Animated.Value(translateY)).current;

    /**
     * if using Animated.ValueXY, cannot pass config with keys ( easing, etc. ) leading to undefined values
     * because react-native-web tries to examine configValue.x leading to fatal error "Cannot read property 'x' of
     * undefined" need to either:
     * -drop undefined settings from the config object
     * -map to {x: undefined, y: undefined} (worst option as likely to error at a later step)
     * -use two separate Animated.Values rather than one ValueXY
     *
     * also ValueXY.getTranslateTransform() causes a TS error
     * so choosing to go with the two-value approach via a parallel animation
     */

    const sharedSettings = {
        duration,
        easing,
        delay,
        isInteraction,
        useNativeDriver: true,
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animX, {
                toValue: translateX,
                ...sharedSettings,
            }),
            Animated.timing(animY, {
                toValue: translateY,
                ...sharedSettings,
            })
        ]).start(onEnd);
        //do I need a clean-up?
    }, [translateX, translateY]);

    return {
        translateX: animX,
        translateY: animY
    };
};
