import React, {JSX, useEffect, useState} from "react";
import {Alert, ScrollView, Text, View, StyleSheet, Pressable} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JawshanView from "./JawshanView.tsx";
import { useNavigation } from "@react-navigation/native";


const PROGRESS_KEY = 'app:progress'

export default function JawshanTracker(): JSX.Element {

    // Navigation
    const navigation = useNavigation<any>();
    const [active, setActive] = useState(true);


    const TOTAL_PARTS = 102;

    const [totalRead, setTotalRead] = useState<number>(0);
    const [todayCount, setTodayCount] = useState<number>(0);
    const [dailyTarget, setDailyTarget] = useState<number>(15);

    const doneSoFar = totalRead + todayCount;
    const remaining = Math.max(0, TOTAL_PARTS - doneSoFar);
    const shownTarget = Math.min(dailyTarget, remaining);

    const currentBab = Math.min(TOTAL_PARTS, doneSoFar + 1);


    const [checked, setChecked] = useState<boolean>(false);


    useEffect(() => {
        const loadLastPage = async ()=>{
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (stored){
                const parsed = JSON.parse(stored);
                setTotalRead(Number(parsed.jawshan?.total ?? 0));
                setTodayCount(Number(parsed.jawshan?.todayCount ?? 0));
                setDailyTarget(Number(parsed.jawshan?.dailyTarget ?? 15));
                setActive(Boolean(parsed.jawshan?.active));

            }
        };
        loadLastPage();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) return;

        Alert.alert("Onay", `${currentBab}. bab'i okudunuz mu?`,
            [
                {
                    text: "Iptal",
                    onPress: () => {
                        console.log("Iptal edildi");
                        setChecked(false);
                    },
                    style: 'cancel',
                    isPreferred: true
                },
                {
                    text: 'Evet',
                    onPress: async () => {
                        const stored = await AsyncStorage.getItem(PROGRESS_KEY);
                        if (!stored) return;
                        const progress = JSON.parse(stored);
                        if (!progress.jawshan) {
                            progress.jawshan = { total: 0 };
                        }
                        const nextToday = Number(progress.jawshan.todayCount ?? 0) + 1;
                        progress.jawshan.todayCount = nextToday;

                        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
                        setTodayCount(nextToday);
                        setChecked(false);


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
                    Cevşen kapali. Cevşen'i malzemelere eklemek icin -{">"} {" "}
                </Text>
                <Pressable onPress={() => navigation.navigate("Recipe")} style={({pressed}) => [styles.linkWrap, pressed && styles.linkPressed]}>
                    <Text style={styles.linkText}>Malzemeleri ayarla</Text>
                </Pressable>
            </View>
        );

    if (remaining === 0) {
        return (
            <View style={styles.doneWrap}>
                <Text style={styles.doneTitle}>Cevşen tamamlandi</Text>
                <Text style={styles.doneText}>Toplam: {TOTAL_PARTS}/{TOTAL_PARTS}</Text>

                <Pressable
                    onPress={() => navigation.navigate("Recipe")}
                    style={({ pressed }) => [styles.linkWrap, pressed && styles.linkPressed]}
                >
                    <Text style={styles.linkText}>Malzemeleri ayarla</Text>
                </Pressable>
            </View>
        );
    }




    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View>



                <JawshanView babNumber={currentBab} />
                <Text style={styles.counter}>{todayCount}/{shownTarget}</Text>

                <View style={styles.checkRow}>
                    <CheckBox
                        value={checked}
                        disabled={shownTarget === 0 || todayCount >= shownTarget}

                        onValueChange={(v) => {
                            setChecked(v);
                            handleCheckChange(v);
                        }}
                        tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}

                    />
                    <Text style={styles.checkText}>{currentBab}. Bab'i okudum ✔</Text>
                </View>

            </View>
        </ScrollView>

  );
}

const colors = {
    background: '#041219',
    card: '#072f36',
    accentBlue: '#0f5b83',
    accentGreen: '#1f7a3a',
    textPrimary: '#e6f7ff',
    muted: 'rgba(255,255,255,0.65)'
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    content: { padding: 16, paddingBottom: 40 },

    counter: { marginTop: 8, color: colors.muted, fontSize: 16 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
    checkText: { color: colors.textPrimary, fontSize: 20, fontWeight: '500' },

    inactiveWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    inactiveText: { color: colors.muted, marginBottom: 8 },
    linkWrap: { alignSelf: 'flex-start' },
    linkText: { color: colors.accentBlue, textDecorationLine: 'underline', fontWeight: '600' },
    linkPressed: { opacity: 0.8 },

    doneWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    doneTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', marginBottom: 6 },
    doneText: { color: colors.muted, marginBottom: 8 },

});
