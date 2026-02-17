import {Pressable, ScrollView, Text, View, StyleSheet} from "react-native";
import SalavatSlider from "../components/SalavatSlider";
import DhikrCounter from "../components/DhikrCounter.tsx";
import QuranTracker from "../components/QuranTracker";

import JawshanViewPage from "../components/JawshanTracker.tsx";
import MemorizationTracker from "../components/MemorizationTracker.tsx";
import {useState} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTranslation} from "react-i18next";


export default function TodayScreen() {
    const [salavatDone, setSalavatDone] = useState(false);

    // Recipes toggles
    const [openDhikr, setOpenDhikr] = useState(false);
    const [openQuran, setOpenQuran] = useState(false);
    const [openJawshan, setOpenJawshan] = useState(false);
    const [openMemorization, setOpenMemorization] = useState(false);

    const {t}  = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {/* Salawat – always */}
                <View style={styles.card}>
                <SalavatSlider
                    label={t("salavat_label_send")}
                    disabled={salavatDone}
                    onUnlock={() => setSalavatDone(true)}
                />
                </View>

                {/* Dhikr – optional */}
                <View style={styles.card}>
                    <Pressable onPress={() => setOpenDhikr(prev => !prev)} style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("today_dhikr_title")}
                        </Text>
                        <Text style={styles.cardAction}>{openDhikr ? t("toggle_close") : t("toggle_open")}</Text>
                    </Pressable>
                    {openDhikr && <View style={styles.cardBody}><DhikrCounter/></View>}
                </View>


                {/* Quran */}
                <View style={styles.card}>
                    <Pressable onPress={() => setOpenQuran(prev => !prev)} style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("today_quran_title")}
                        </Text>
                        <Text style={styles.cardAction}>{openQuran ? t("toggle_close") : t("toggle_open")}</Text>
                    </Pressable>
                    {openQuran && <View style={styles.cardBody}><QuranTracker/></View>}
                </View>


                {/* Jawshan */}
                <View style={styles.card}>
                    <Pressable onPress={() => setOpenJawshan(prev => !prev)} style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("today_jawshan_title")}
                        </Text>
                        <Text style={styles.cardAction}>{openJawshan ? t("toggle_close") : t("toggle_open")}</Text>
                    </Pressable>
                    {openJawshan && <View style={styles.cardBody}><JawshanViewPage/></View>}
                </View>


                {/* Memorization */}
                <View style={styles.card}>
                    <Pressable onPress={() => setOpenMemorization(prev => !prev)} style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("today_memorization_title")}
                        </Text>
                        <Text style={styles.cardAction}>{openMemorization ? t("toggle_close") : t("toggle_open")}</Text>
                    </Pressable>
                    {openMemorization && <View style={styles.cardBody}><MemorizationTracker/></View>}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const colors = {
    background: '#041219', // deeper dark navy
    card: '#072f36', // deep teal
    accentBlue: '#0f5b83', // slightly brighter deep blue
    accentGreen: '#1f7a3a', // deep green
    textPrimary: '#e6f7ff',
    textAction: '#7CB7FF'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        gap: 12,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    cardAction: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textAction,
    },
    cardBody: {
        marginTop: 10,
    }
});
