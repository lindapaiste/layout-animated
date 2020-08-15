import {Animated, ViewProps} from "react-native";
import React, {PropsWithChildren} from "react";
import useAnimatedFixedSize, {Props} from "./useAnimatedFixedSize";

/**
 * handles the animation itself internally
 * expects to get a height and width that change suddenly to new values
 * but this component slows it down into a smooth transition
 *
 * NOTE: POSITIONING IN LAYOUT WILL BE BASED ON THE INITIAL SIZE
 */
export default (props: Props & PropsWithChildren<ViewProps>) => {

    const {scaleX, scaleY, translateY, translateX, basisSize} = useAnimatedFixedSize(props);

    return (
        <Animated.View
            {...props}
            style={[
                props.style,
                {
                    width: basisSize.width,
                    height: basisSize.height,
                    overflow: "hidden",
                    transform: [{scaleX}, {scaleY}, {translateY}, {translateX}]
                }
            ]}
        />
    );
};
