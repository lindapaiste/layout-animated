import {Animated, ViewProps} from "react-native";
import React, {PropsWithChildren} from "react";
import useAnimatedTranslate, {Props} from "./useAnimatedTranslate";

/**
 * like AnimatedFixedSize but for translation
 * handles the animation itself internally
 */
export default (props: Props & PropsWithChildren<ViewProps>) => {

    const {translateX, translateY} = useAnimatedTranslate(props);

    return (
        <Animated.View
            {...props}
            style={[
                props.style,
                {
                    transform: [
                        {translateX},
                        {translateY},
                    ]
                }
            ]}
        />
    );
};
