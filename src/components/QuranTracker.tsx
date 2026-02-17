import {Alert, Text, View, StyleSheet, Pressable} from "react-native";
import { useEffect, useState} from "react";

import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuranPDFView from "./QuranPDFView.tsx";
import { useNavigation } from "@react-navigation/native";
import {useTranslation} from "react-i18next";



const PROGRESS_KEY = 'app:progress'

export default function QuranTracker(){

    const { t } = useTranslation();

    // Navigation
    const navigation = useNavigation<any>();

    const [active, setActive] = useState(true);



    // Quran State for UI
    const [totalRead, setTotalRead] = useState<number>(0)
    const currentPage = totalRead + 1;
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const loadLastPage = async ()=>{
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (stored){
                const parsed = JSON.parse(stored);
                setTotalRead(Number(parsed.quran?.total ?? 0));
                setActive(parsed.quran?.active ?? true);

            }
        };
        loadLastPage();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) return;

        Alert.alert(
            t("confirm_title"),
            t("confirm_mark_page"),
            [
                {
                    text: t("confirm_cancel"),
                    onPress: ()=> {
                        setChecked(false)
                    },
                    style: 'cancel',
                    isPreferred: true
                },
                {
                    text: t("confirm_yes"),
                    onPress: async () => {
                        const stored = await AsyncStorage.getItem(PROGRESS_KEY);
                        if (!stored) return;
                        const progress = JSON.parse(stored);
                        if (!progress.quran) {
                            progress.quran = { total: 0, todayCount: 0, active: true };
                        }

                        const total = Number(progress.quran.total ?? 0);
                        const nextPage = total + 1;

                        progress.quran.total = nextPage;
                        progress.quran.todayCount = Number(progress.quran.todayCount ?? 0) + 1;

                        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
                        setTotalRead(nextPage);
                        setChecked(false)

                    },
                    style: 'default',
                },
            ],
        );


    }

    if (!active)
        return (
            <View style={styles.inactiveWrap}>
                <Text style={styles.inactiveText}>
                    {t("quran_inactive")}
                </Text>
                <Pressable onPress={() => navigation.navigate("Recipe") } style={({pressed}) => [styles.linkWrap, pressed && styles.linkPressed]}>
                    <Text style={styles.linkText}>
                        {t("action_configure")}
                    </Text>
                </Pressable>
            </View>
        );


    return (
        <View style={styles.container}>

            <Text style={styles.pageLabel}>
                {t("quran_page", {currentPage})}
            </Text>

            <QuranPDFView page={currentPage} />

            <View style={styles.checkRow}>
                <CheckBox
                    value={checked}
                    onValueChange={(v) => {
                        setChecked(v);
                        handleCheckChange(v);
                    }}
                    tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}
                />
                <Text style={styles.checkText}>
                    {t("quran_mark_read",{currentPage})}
                </Text>
            </View>

        </View>
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
    container: { backgroundColor: 'transparent' },
    pageLabel: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 8 },

    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
    checkText: { color: colors.textPrimary },

    inactiveWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    inactiveText: { color: colors.muted, marginBottom: 8 },
    linkWrap: { alignSelf: 'flex-start' },
    linkText: { color: colors.accentBlue, textDecorationLine: 'underline', fontWeight: '600' },
    linkPressed: { opacity: 0.8 }
});
