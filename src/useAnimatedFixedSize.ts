import {Animated} from "react-native";
import {useEffect, useRef} from "react";
import {TimerSettings} from "./types";
import usePreserveOrigin from "./usePreserveOrigin";

/**
 * looks for changes in props width and height
 * and turns sudden changes into animated values for scaleX and scaleY
 * also returns the initial size which was used as the basis for scaling
 */

export interface Size {
    width: number;
    height: number;
}

export type Props = {
    preserveOrigin?: boolean;
} & Size
    & TimerSettings;

export type Returns = {
    /**
     * the core return value is the scale
     */
    scaleX: Animated.Value;
    scaleY: Animated.Value;
    /**
     * translateX and Y will be 0 if not preserving origin
     */
    translateX: number | Animated.Value;
    translateY: number | Animated.Value;
    /**
     * rendering component needs to know what size was used as the basis
     */
    basisSize: Size;
}

export default ({
                    width, height, preserveOrigin = false, onEnd = () => {
    }, ...props
                }: Props): Returns => {
    /**
     * save the initial size
     * this should never change it is just used as a basis for scaling
     */
    const basisSize = useRef({width, height}).current;
    /**
     * instead of using interpolation, doing two separate values for width and height
     * set the initial scale to 1 and update the scales by dividing the new value by the initial
     */
    const scaleX = useRef(new Animated.Value(1)).current;

    const scaleY = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleX, {
                useNativeDriver: true,
                ...props,
                toValue: width / basisSize.width,
            }),
            Animated.timing(scaleY, {
                useNativeDriver: true,
                ...props,
                toValue: height / basisSize.height,
            })
        ]).start(onEnd);
        //do I need a clean-up?
    }, [width, height]);

    const translation = preserveOrigin ? usePreserveOrigin({...props, basisSize, newSize: {width, height}}) : {
        translateX: 0,
        translateY: 0,
    }

    return {
        scaleX,
        scaleY,
        basisSize,
        ...translation
    }
};
