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
    const [startPage, setStartPage] = useState<number>(1);

    const remaining = Math.max(0, TOTAL_PAGES - totalRead);
    const shownTarget = Math.min(dailyTarget, remaining);
    const isDailyDone = shownTarget > 0 && todayCount >= shownTarget;
    // Respect user-configured startPage when computing the visible page
    const currentPage = isDailyDone ? Math.max(startPage, totalRead) : totalRead + 1;

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            const total = Number(parsed.extras?.total ?? 0);
            const sp = Number(parsed.extras?.startPage ?? 1);
            // normalize total so it's at least startPage - 1
            const normalizedTotal = total < Math.max(0, sp - 1) ? Math.max(0, sp - 1) : total;
            setTotalRead(normalizedTotal);
            setStartPage(sp);
            setActive(parsed.extras?.active ?? true);
            setTodayCount(Number(parsed.extras?.todayCount ?? 0));
            setDailyTarget(Number(parsed.extras?.dailyTarget ?? 1));
            setPdfUri(parsed.extras?.pdfUri ?? null);
        };
        load();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) {
            setChecked(false);
            return;
        }

        // Show confirmation alert
        Alert.alert(
            t("confirm_title"),
            t("confirm_mark_page", { currentPage }),
            [
                {
                    text: t("confirm_cancel"),
                    onPress: () => {
                        setChecked(false);
                    },
                    style: 'cancel',
                    isPreferred: true
                },
                {
                    text: t("confirm_yes"),
                    onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
                            if (!stored) {
                                setChecked(false);
                                return;
                            }

                            const progress = JSON.parse(stored);
                            if (!progress.extras) {
                                progress.extras = { total: 0, todayCount: 0, active: true, dailyTarget: 1, pdfUri: null };
                            }

                            const total = Number(progress.extras.total ?? 0);
                            const nextPage = total + 1;
                            const dailyTargetValue = Number(progress.extras.dailyTarget ?? 1);

                            progress.extras.total = nextPage;
                            progress.extras.todayCount = Number(progress.extras.todayCount ?? 0) + 1;
                            await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

                            setTotalRead(nextPage);
                            setTodayCount(progress.extras.todayCount);
                            setDailyTarget(dailyTargetValue);

                            const remaining = Math.max(0, TOTAL_PAGES - nextPage);
                            const targetPages = Math.min(dailyTargetValue, remaining);

                            if (progress.extras.todayCount >= targetPages) {
                                Alert.alert(t("extra_daily_done_title"), t("extra_daily_done_desc", { target: targetPages }));
                            }
                        } catch (error) {
                            console.error('Error updating progress:', error);
                            Alert.alert(t("alert_error"), "Sayfalar sayılırken bir hata oluştu.");
                        } finally {
                            setChecked(false);
                        }
                    },
                    style: 'default'
                }
            ]
        );
    }

    if (!active) return (
        <View style={styles.inactiveWrap}><Text style={styles.inactiveText}>{t("extra_inactive")}</Text></View>
    );

    // If daily target reached, close reading area and show summary
    if (isDailyDone && shownTarget > 0) {
        return (
            <View style={styles.doneWrap}>
                <Text style={styles.doneTitle}>{t("extra_daily_done_title")}</Text>
                <Text style={styles.doneText}>{t("extra_daily_done_desc", { target: shownTarget })}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageLabel}>{t("extra_page", { currentPage })}</Text>
            <Text style={styles.pageLabel}>{todayCount}/{shownTarget}</Text>

            <ExtraPDFView uri={pdfUri ?? undefined} page={currentPage} />

            <View style={styles.checkRow}>
                <CheckBox
                    value={checked}
                    disabled={shownTarget === 0 || isDailyDone}
                    onValueChange={(value) => {
                        if (value) {
                            setChecked(true);
                            handleCheckChange(true);
                        }
                    }}
                    tintColors={{ true: '#00ffff', false: 'rgba(255,255,255,0.4)'}}
                />
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
    ,
    doneWrap: { padding: 12, backgroundColor: '#072f36', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    doneTitle: { color: '#e6f7ff', fontSize: 18, fontWeight: '700', marginBottom: 6 },
    doneText: { color: 'rgba(255,255,255,0.65)', marginBottom: 8 }
});
