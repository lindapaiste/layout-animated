import {Button, Text, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {randomXY} from "./DemoTranslate";
import AnimatedFixedSize from "../AnimatedFixedSize";

export default () => {
    const [position, setPosition] = useState(randomXY(500));

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title={"Change Size"} onPress={() => setPosition(randomXY(500))}/>
            <Text>Size: {position.x} x {position.y}</Text>
            <AnimatedFixedSize
                width={position.x}
                height={position.y}
                preserveOrigin={true}
            >
                <View
                    style={{
                        backgroundColor: "red",
                        width: "100%",
                        height: "100%"
                    }}
                />
            </AnimatedFixedSize>
        </View>
    )
}
