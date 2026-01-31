import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type Props = {
    width?: number;
    onUnlock: () => void;
    disabled?: boolean;
    label?: string;
};

export default function SalavatSlider({
                                          width = 175,
                                          onUnlock,
                                          disabled = false,
                                          label = "Slide to unlock",
                                      }: Props) {
    const thumbSize = 56;
    const padding = 4;

    const maxX = width - thumbSize;
    const x = useSharedValue(0);

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            if (disabled) return;

            const next = Math.max(0, Math.min(maxX, e.translationX));
            x.value = next;
        })

        .onEnd(() => {
            if (disabled) return;

            const reached = x.value >= maxX * 0.85;

            if (reached) {
                x.value = withSpring(maxX);
                scheduleOnRN(onUnlock);
            } else {
                x.value = withSpring(0);
            }
        });

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }],
    }));

    return (
        <View style={{
            alignItems: "center",

        }}>
            <Text style={{ marginBottom: 12 }}>{label}</Text>

            <View
                style={{
                    width,
                    height: thumbSize,
                    borderRadius: thumbSize / 2,
                    justifyContent: "center",
                    padding,
                    opacity: disabled ? 0.9 : 1,

                    backgroundColor: disabled ? "#2ecc71" : "#937878",
                    borderWidth: 1,
                    borderColor: disabled ? "#27ae60" : "#6e4f4f",
                }}
            >
                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            {
                                width: thumbSize - padding * 2,
                                height: thumbSize - padding * 2,
                                borderRadius: (thumbSize - padding * 2) / 2,

                                backgroundColor: disabled ? "#1e8449" : "#ffffff",
                                borderWidth: 1,
                                borderColor: disabled ? "#145a32" : "#cccccc",

                                shadowColor: "#000",
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                shadowOffset: { width: 0, height: 2 },
                            },
                            thumbStyle,
                        ]}
                    />
                </GestureDetector>
            </View>
        </View>
    );
}
