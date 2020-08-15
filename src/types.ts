import {Animated} from "react-native";

/**
 * optional settings for calling an Animated.timing
 */
export interface TimerSettings {
    duration?: number;
    delay?: number;
    easing?: (value: number) => number;
    isInteraction?: boolean;
    onEnd?(result: Animated.EndResult): void;
}

export interface HookReturns {

}
