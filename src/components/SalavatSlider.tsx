import React, {useEffect, useState} from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    width?: number;
    onUnlock: () => void;
    disabled?: boolean;
    label?: string;
};

export default function SalavatSlider({width = 275, onUnlock, disabled = false, label = "Slide to unlock",}: Props) {

    const [todayCount, setTodayCount] = useState(0);
    const done = todayCount >= 1;


    const thumbSize = 56;
    const padding = 4;

    const maxX = width - thumbSize;
    const x = useSharedValue(0);


    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem("app:progress");
            if (!raw) return;

            const progress = JSON.parse(raw);
            const storedCount = progress.salawat?.doneToday ? 1 : 0;
            setTodayCount(storedCount);

            if (storedCount === 1) {
                x.value = withSpring(maxX);
            }

        };

        load();
    }, [maxX, x]);


    const saveDoneToday = async () => {
        const raw = await AsyncStorage.getItem("app:progress");
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.salawat = progress.salawat ?? {};
        progress.salawat.doneToday = true;

        await AsyncStorage.setItem("app:progress", JSON.stringify(progress));

        setTodayCount(1);
        onUnlock();
    };








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
                scheduleOnRN(saveDoneToday);
            } else {
                x.value = withSpring(0);
            }
        })


    const thumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }],
    }));

    return (
        <View style={{
            alignItems: "center",

        }}>
            <Text style={{ marginBottom: 12 }}>{label}</Text>
            <Text style={{ marginBottom: 12 }}>
                {todayCount} / 1
            </Text>



            <View
                style={{
                    width,
                    height: thumbSize,
                    borderRadius: thumbSize / 2,
                    justifyContent: "center",
                    padding,
                    opacity: done ? 0.9 : 1,

                    backgroundColor: done ? "#2ecc71" : "#937878",
                    borderWidth: 1,
                    borderColor: done ? "#27ae60" : "#6e4f4f",
                }}
            >
                {/* Text for slider */}
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        paddingHorizontal: 16,
                        textAlign: "center",
                        color: "#000000",
                        fontWeight: "600",
                        fontSize: 10,

                    }}
                >
                    {done ? "Salavat Gönderildi" : "Allahümme Salli ala seyyidina Muhammed"}
                </Text>


                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            {
                                width: thumbSize - padding * 2,
                                height: thumbSize - padding * 2,
                                borderRadius: (thumbSize - padding * 2) / 2,

                                backgroundColor: done
                                    ? "rgba(30,132,73,0.6)"
                                    : "rgba(255,255,255,0.6)",

                                borderWidth: 1,
                                borderColor: done ? "#145a32" : "#cccccc",

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
