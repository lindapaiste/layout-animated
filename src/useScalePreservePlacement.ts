import {TimerSettings} from "./types";
import {Animated} from "react-native";
import useAnimatedTranslate from "./useAnimatedTranslate";
import useAnimatedScale from "./useAnimatedScale";

/**
 * provides a way to scale an object up or down while keeping the top left corner at (0,0)
 * whereas applying a scale transform by itself keeps the center the same and moves the corners
 *
 * needs access to the actual size, pre-scaling, to compute the translation
 */

export type Props = {
    width: number;
    height: number;
    scale: number;
} & TimerSettings;

export interface Return {
    scale: Animated.Value;
    translateX: Animated.Value;
    translateY: Animated.Value;
}

export default ({width, height, scale, ...props}: Props): Return => {

    const translateX = (width * scale - width) / 2;
    const translateY = (height * scale - height) / 2;

    const animatedTranslate = useAnimatedTranslate({...props, translateX, translateY});

    const animatedScale = useAnimatedScale({...props, scale});

    return {
        scale: animatedScale.scale,
        translateX: animatedTranslate.translateX,
        translateY: animatedTranslate.translateY,
    }
}
