import {Animated} from "react-native";
import {useEffect, useRef} from "react";
import {TimerSettings} from "./types";

/**
 * for scaling while preserving aspect ratio
 * takes scale as a prop and returns an animated version
 */
export type Props = {
    scale?: number;
} & TimerSettings;

/**
 * could return the one value directly rather than in an object
 */
export interface Returns {
    scale: Animated.Value;
}

export default ({
                    scale = 1, onEnd = () => {
    }, ...props
                }: Props): Returns => {

    const anim = useRef(new Animated.Value(scale)).current;

    useEffect(() => {
        Animated.timing(anim, {
            useNativeDriver: true,
            ...props,
            toValue: scale,
        }).start(onEnd);
        //do I need a clean-up?
    }, [scale]);

    return {
        scale: anim
    };
};
