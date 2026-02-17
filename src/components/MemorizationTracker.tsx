import React, { JSX, useEffect, useState } from "react";
import {Alert, ScrollView, Text, View, StyleSheet, Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import { surahMap } from "../../assets/Quran";


const PROGRESS_KEY = "app:progress";




type Memorization = {
    active: boolean;
    surahNumber: number;
    ayahStart: number;
    ayahEnd: number;
    dailyTarget?: number;
    todayCount?: number;
    total?: number;
};

export default function MemorizationTracker(): JSX.Element {


    const {t} = useTranslation();

    const [memorization, setMemorization] = useState<Memorization | null>(null);
    const [loaded, setLoaded] = useState(false);

    const navigation = useNavigation<any>();

    // Text state for the memorization piece
    const [pieceText, setPieceText] = useState("");

    // Counter states
    const [todayCount, setTodayCount] = useState(0);


    // Counter function
    const  handleCounter= async () => {
        if (!memorization) return;

        const target = Number(memorization.dailyTarget ?? 0);
        if (!target || target <= 0) {
            Alert.alert(t("error_inlvalid"), t("error_invalid_message"));
            return;
        }

        if (todayCount >= target) return;

        const next = todayCount + 1;
        setTodayCount(next);

        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        if (!progress.memorization) progress.memorization = {};

        progress.memorization.todayCount = next;
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        if (next === target) {
            Alert.alert("Tamam", "Bugunluk ezber hedefi tamam. Yarin tekrar gorusuruz.");
        }
    };


    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(PROGRESS_KEY);
            if (!raw) {
                setLoaded(true);
                return;
            }

            const progress = JSON.parse(raw);
            const mem = progress.memorization;

            if (!mem) {
                setLoaded(true);
                return;
            }

            setMemorization({
                active: Boolean(mem.active),
                surahNumber: Number(mem.surahNumber),
                ayahStart: Number(mem.ayahStart),
                ayahEnd: Number(mem.ayahEnd),
                dailyTarget: mem.dailyTarget != null ? Number(mem.dailyTarget) : undefined,
                todayCount: mem.todayCount != null ? Number(mem.todayCount) : 0,
                total: mem.total != null ? Number(mem.total) : 0,
            });
            const normalizedToday = mem.todayCount != null ? Number(mem.todayCount) : 0;
            setTodayCount(normalizedToday);


            setLoaded(true);
        };

        load();
    }, []);

    useEffect(() => {
        if (!memorization || !memorization.active) return;

        const start = memorization.ayahStart;
        const end = memorization.ayahEnd;

        if (start > end) {
            setPieceText(t("memorization_invalid_range"));
            return;
        }

        const surah = surahMap[memorization.surahNumber];

        if (!surah) {
            setPieceText(t("memorization_surah_missing", { number: memorization.surahNumber }));
            return;
        }

        const lines: string[] = [];

        for (let aya = start; aya <= end; aya++) {
            const text = surah[String(aya)];
            if (text) {
                lines.push(`${aya}. ${text.replace(/۪/g, 'ِ')}`);
            }
        }



        setPieceText(lines.join("\n"));


    }, [memorization, t]);


    if (!loaded) return <Text style={styles.loadingText}>
        {t("loading_text")}
    </Text>;

    if (!memorization) return <Text style={styles.missingText}>
        {t("memorization_missing")}
    </Text>;

    if (!memorization.active)
        return (
            <View style={styles.inactiveWrap}>
                <Text style={styles.inactiveText}>
                    {t("memorization_inactive")}
                </Text>
                <Pressable onPress={() => navigation.navigate('Recipe')} style={({pressed}) => [styles.linkWrap, pressed && styles.linkPressed]}>
                    <Text style={styles.linkText}>
                        {t("action_configure")}
                    </Text>
                </Pressable>
            </View>
        );



    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View>


                <Text style={styles.meta}>
                    {t("memorization_surah", { number: memorization.surahNumber })}
                </Text>
                <Text style={styles.meta}>
                    {t("memorization_ayah_range", {
                        start: memorization.ayahStart,
                        end: memorization.ayahEnd
                    })}

                </Text>

                <Text style={styles.counter}>{todayCount}/{memorization.dailyTarget}</Text>


                <Text
                    selectable
                    style={styles.pieceText}
                >
                    {pieceText}
                </Text>


                <Pressable onPress={handleCounter} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]} disabled={todayCount >= Number(memorization.dailyTarget ?? 0)}>
                    <Text style={styles.primaryButtonText}>
                        {t("memorization_button_read")}
                    </Text>
                </Pressable>


            </View>
        </ScrollView>
    );
}

const colors = {
    background: '#041219',
    card: '#072f36',
    accentBlue: '#00ffff',
    accentGreen: '#1f7a3a',
    textPrimary: '#e6f7ff',
    muted: 'rgba(255,255,255,0.65)'
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    content: { padding: 16, paddingBottom: 40 },


    meta: { color: colors.muted, marginBottom: 6 },
    counter: { marginTop: 12, color: colors.textPrimary },

    pieceText: {

        marginTop: 12,
        fontSize: 28,
        lineHeight: 42,
        textAlign: 'right',
        writingDirection: 'rtl',
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#052026',
        color: colors.textPrimary
    },

    primaryButton: {
        backgroundColor: colors.card,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: colors.accentGreen,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 14
    },
    buttonPressed: { opacity: 0.95, transform: [{ scale: 0.998 }] },
    primaryButtonText: { color: colors.textPrimary, fontWeight: '700' },

    loadingText: { color: colors.textPrimary },
    missingText: { color: colors.muted },

    inactiveWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
    inactiveText: { color: colors.muted, flexShrink: 1 },
    linkWrap: { marginLeft: 10 },
    linkText: { color: colors.accentBlue, textDecorationLine: 'underline', fontWeight: '600' },
    linkPressed: { opacity: 0.8 }
});
