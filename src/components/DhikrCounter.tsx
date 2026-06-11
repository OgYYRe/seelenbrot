import React from 'react';
import {useEffect, useState} from "react";
import {Pressable, Text, View, StyleSheet} from "react-native";
import Animated, { useSharedValue, useAnimatedProps, withTiming, interpolateColor } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {useTranslation} from "react-i18next";


type DhikrProps = {
    target?: number;
    name?: string;
};

type Dhikr ={
    name?: string,
    target?: number
};

const colors = {
    background: '#041219',
    card: '#072f36',
    accentBlue: '#000000',
    accentGreen: '#1f7a3a',
    textPrimary: '#e6f7ff',
    muted: 'rgba(255,255,255,0.65)'
}

export default function DhikrCounter({target, name}: DhikrProps) {

    const {t} = useTranslation();

    // Navigation
    const navigation = useNavigation<any>();
    const [active, setActive] = useState(true);


    const [dhikr, setDhikr] = useState<Dhikr | null>(null);




    const [todayCount, setTodayCount] = useState(0);
    const progressShared = useSharedValue(0);
    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem("app:progress");
            if (!raw) return;

            const progress = JSON.parse(raw);

            setTodayCount(progress.dhikr?.todayCount ?? 0);
            setActive(progress.dhikr?.active !== false);

            if (progress?.dhikr?.active === false) {
                setDhikr(null);
                return;
            }

            setDhikr({
                name: typeof progress.dhikr?.dhikrName === "string" ? progress.dhikr.dhikrName : "",
                target: Number(progress.dhikr?.dailyTarget ?? 0),
            });
            // initialize shared progress value
            const initial = Number(progress.dhikr?.todayCount ?? 0) / Math.max(1, Number(progress.dhikr?.dailyTarget ?? 1));
            progressShared.value = initial > 1 ? 1 : initial;
        };

        load();
    }, []);


    const usedTarget = target ?? dhikr?.target ?? 0;
    const usedName = name ?? dhikr?.name ?? "Zikir";
    const done: boolean = todayCount >= usedTarget;

    async function onDhikrPress() {
        if (todayCount >= usedTarget) return;

        const raw = await AsyncStorage.getItem('app:progress');
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.dhikr = progress.dhikr ?? {};



        const current = Number(progress.dhikr.todayCount ?? 0);
        progress.dhikr.todayCount = current + 1;

        await AsyncStorage.setItem('app:progress', JSON.stringify(progress));
        setTodayCount(current + 1);
        // animate progress
        const newRatio = Math.min(1, (current + 1) / Math.max(1, usedTarget));
        progressShared.value = withTiming(newRatio, { duration: 350 });

    }

    if (!active)
        return (
            <View style={styles.inactiveWrap}>
                <Text style={styles.inactiveText}>
                    {t("today_dhikr_inactive")}
                </Text>

                <Text
                    onPress={() => navigation.navigate("Recipe")}
                    style={styles.linkText}
                >
                    {t("action_configure")}
                </Text>
            </View>
        );




    // circle progress parameters
    const size = 86;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const fgAnimatedProps = useAnimatedProps(() => {
        const dashoffset = circumference * (1 - progressShared.value);
        const stroke = interpolateColor(progressShared.value, [0, 1], [colors.accentBlue, colors.accentGreen]);
        return {
            strokeDashoffset: dashoffset,
            stroke: stroke,
        } as any;
    });

    const innerMaxRadius = radius - strokeWidth - 2;
    const innerAnimatedProps = useAnimatedProps(() => {
        const r = innerMaxRadius * Math.sqrt(progressShared.value);
        return { r } as any;
    });

    return (


        <View style={styles.containerRow}>
            <View style={styles.circleWrap}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Circle cx={size/2} cy={size/2} r={radius} stroke={'rgba(255,255,255,0.06)'} strokeWidth={strokeWidth} fill={'transparent'} />
                    <AnimatedCircle animatedProps={fgAnimatedProps} cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth} strokeLinecap={'round'} strokeDasharray={`${circumference} ${circumference}`} transform={`rotate(-90 ${size/2} ${size/2})`} fill={'transparent'} />
                    <Circle cx={size/2} cy={size/2} r={radius - strokeWidth - 2} fill={'rgba(255,255,255,0.02)'} />
                    <AnimatedCircle animatedProps={innerAnimatedProps} cx={size/2} cy={size/2} strokeWidth={0} fill={colors.accentGreen} />
                </Svg>
                <View style={styles.circleLabel}><Text style={styles.countText}>{todayCount}</Text></View>
            </View>

            <View style={styles.controls}>
                <Text style={styles.smallLabel}>{todayCount} / {usedTarget}</Text>
                <Pressable onPress={onDhikrPress} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]} disabled={done}>
                    <Text style={styles.primaryButtonText}>{usedName} +1</Text>
                </Pressable>
                {done && <Text style={styles.doneText}>{t("dhikr_done_message")}</Text>}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: 6 },
    containerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    circleWrap: { width: 86, height: 86, alignItems: 'center', justifyContent: 'center' },
    circleLabel: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
    controls: { flex: 1 },
    smallLabel: { color: colors.textPrimary, marginBottom: 6 },
    countText: { color: colors.textPrimary, fontWeight: '600', marginBottom: 8, textAlign: 'center' },

    primaryButton: {
        backgroundColor: colors.accentBlue,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: colors.accentGreen,

    },
    buttonPressed: { opacity: 0.95 },
    primaryButtonText: { color: colors.textPrimary, fontWeight: '700' },

    doneText: { color: colors.muted, marginTop: 8 },

    inactiveWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    inactiveText: { color: colors.muted, marginBottom: 8 },
    linkText: { color: colors.accentBlue, textDecorationLine: 'underline', fontWeight: '700' }
});
