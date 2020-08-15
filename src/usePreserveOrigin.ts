import {Size} from "./useAnimatedFixedSize";
import {TimerSettings} from "./types";
import {Animated} from "react-native";
import useAnimatedTranslate from "./useAnimatedTranslate";

/**
 * creates an animated translation based on the change in size
 * if there is already a translation applied, compose higher-up? or here?
 */

export type Props = {
    basisSize: Size;
    newSize: Size;
} & TimerSettings;

export type Returns = {
    translateX: Animated.Value;
    translateY: Animated.Value;
}

export default ({basisSize, newSize, ...props}: Props): Returns => {

    const translateX = (newSize.width - basisSize.width) / 2;
    const translateY = (newSize.height - basisSize.height) / 2;

    return useAnimatedTranslate({...props, translateY, translateX});

}
