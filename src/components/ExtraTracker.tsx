// Insert ExtraTracker component implementation
import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExtraPDFView from "./ExtraPDFView";
import {useTranslation} from "react-i18next";

const PROGRESS_KEY = 'app:progress'

export default function ExtraTracker(){
    const { t } = useTranslation();
    const TOTAL_PAGES = 9999; // unknown - keep large limit

    const [active, setActive] = useState(true);
    const [totalRead, setTotalRead] = useState<number>(0);
    const [todayCount, setTodayCount] = useState<number>(0);
    const [dailyTarget, setDailyTarget] = useState<number>(1);
    const [pdfUri, setPdfUri] = useState<string | null>(null);

    const remaining = Math.max(0, TOTAL_PAGES - totalRead);
    const shownTarget = Math.min(dailyTarget, remaining);
    const isDailyDone = shownTarget > 0 && todayCount >= shownTarget;
    const currentPage = isDailyDone ? Math.max(1, totalRead) : totalRead + 1;

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            setTotalRead(Number(parsed.extras?.total ?? 0));
            setActive(parsed.extras?.active ?? true);
            setTodayCount(Number(parsed.extras?.todayCount ?? 0));
            setDailyTarget(Number(parsed.extras?.dailyTarget ?? 1));
            setPdfUri(parsed.extras?.pdfUri ?? null);
        };
        load();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) return;
        Alert.alert(
            t("confirm_title"),
            t("confirm_mark_page", { currentPage }),
            [
                { text: t("confirm_cancel"), onPress: () => setChecked(false), style: 'cancel', isPreferred: true },
                { text: t("confirm_yes"), onPress: async () => {
                    const stored = await AsyncStorage.getItem(PROGRESS_KEY);
                    if (!stored) return;
                    const progress = JSON.parse(stored);
                    if (!progress.extras) progress.extras = { total: 0, todayCount: 0, active: true };

                    const total = Number(progress.extras.total ?? 0);
                    const nextPage = total + 1;

                    progress.extras.total = nextPage;
                    progress.extras.todayCount = Number(progress.extras.todayCount ?? 0) + 1;
                    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

                    setTotalRead(nextPage);
                    setTodayCount(progress.extras.todayCount);
                    setChecked(false);

                    const target = Math.min(Number(progress.extras.dailyTarget ?? dailyTarget), Math.max(0, TOTAL_PAGES - nextPage + 1));
                    if (progress.extras.todayCount >= target) {
                        Alert.alert(t("extra_daily_done_title"), t("extra_daily_done_desc", { target }));
                    }
                }, style: 'default' }
            ]
        );
    }

    if (!active) return (
        <View style={styles.inactiveWrap}><Text style={styles.inactiveText}>{t("extra_inactive")}</Text></View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pageLabel}>{t("extra_page", { currentPage })}</Text>
            <Text style={styles.pageLabel}>{todayCount}/{shownTarget}</Text>

            <ExtraPDFView uri={pdfUri ?? undefined} page={currentPage} />

            <View style={styles.checkRow}>
                <CheckBox value={checked} disabled={shownTarget === 0 || isDailyDone} onValueChange={(v)=>{ setChecked(v); handleCheckChange(v); }} tintColors={{ true: '#00ffff', false: 'rgba(255,255,255,0.4)'}} />
                <Text style={styles.checkText}>{t("extra_mark_read", { currentPage })}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'transparent' },
    pageLabel: { color: '#e6f7ff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
    checkText: { color: '#e6f7ff' },
    inactiveWrap: { padding: 12, backgroundColor: '#072f36', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    inactiveText: { color: 'rgba(255,255,255,0.65)', marginBottom: 8 }
});
