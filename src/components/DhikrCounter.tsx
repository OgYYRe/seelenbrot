import React from 'react';
import {useEffect, useState} from "react";
import {Pressable, Text, View, StyleSheet} from "react-native";
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
    accentBlue: '#00ffff',
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




    return (


        <View style={styles.container}>
            <Text style={styles.countText}>{todayCount} / {usedTarget}</Text>

            <Pressable onPress={onDhikrPress} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]} disabled={done}>
                <Text style={styles.primaryButtonText}>{usedName} +1</Text>
            </Pressable>

            {done && <Text style={styles.doneText}>
                {t("dhikr_done_message")}
            </Text>}
        </View>

    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: 6 },
    countText: { color: colors.textPrimary, fontWeight: '600', marginBottom: 8 },

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
