import {Button, View, Text} from "react-native";
import * as React from "react";
import {useState} from "react";
import AnimatedTranslate from "../AnimatedTranslate";

export const randomXY = (max: number = 500) => ({
    x: Math.round( max * Math.random() ),
    y: Math.round( max * Math.random() )
});

export default () => {
    const [position, setPosition] = useState(randomXY);

    return (
        <View>
            <Button title={"Change Position"} onPress={() => setPosition(randomXY())} />
            <Text>Position: ({position.x}, {position.y})</Text>
            <AnimatedTranslate
                translateY={position.y}
                translateX={position.x}
            >
            <View
                style={{
                    backgroundColor: "red",
                    width: 200,
                    height: 200
                }}
            />
            </AnimatedTranslate>
        </View>
    )
}
