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


    const [totalRead, setTotalRead] = useState<number>(0)
    const currentBab = totalRead + 1;
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        const loadLastPage = async ()=>{
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (stored){
                const parsed = JSON.parse(stored);
                setTotalRead(Number(parsed.jawshan?.total ?? 0));
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
                        const total = Number(progress.jawshan.total ?? 0);
                        const nextPage = total + 1;
                        progress.jawshan.total = nextPage;
                        progress.jawshan.todayCount = Number(progress.jawshan.todayCount ?? 0) + 1;

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
                    Cevsen kapali. Cevsen'i malzemelere eklemek icin -{">"} {" "}
                </Text>
                <Pressable onPress={() => navigation.navigate("Recipe")} style={({pressed}) => [styles.linkWrap, pressed && styles.linkPressed]}>
                    <Text style={styles.linkText}>Malzemeleri ayarla</Text>
                </Pressable>
            </View>
        );



    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View>



                <JawshanView babNumber={currentBab} />

                <View style={styles.checkRow}>
                    <CheckBox
                        value={checked}
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

    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
    checkText: { color: colors.textPrimary },

    inactiveWrap: { padding: 12, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
    inactiveText: { color: colors.muted, marginBottom: 8 },
    linkWrap: { alignSelf: 'flex-start' },
    linkText: { color: colors.accentBlue, textDecorationLine: 'underline', fontWeight: '600' },
    linkPressed: { opacity: 0.8 }
});
