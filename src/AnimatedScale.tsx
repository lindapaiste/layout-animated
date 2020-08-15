import React, {PropsWithChildren} from "react";
import {Animated, ViewProps} from "react-native";
import useAnimatedScale, {Props} from "./useAnimatedScale";

export default (props: Props & PropsWithChildren<ViewProps>) => {
    return (
        <Animated.View
            {...props}
            style={[
                props.style,
                {
                    transform: [
                        useAnimatedScale(props)
                    ]
                }
            ]}
        />
    )
}
