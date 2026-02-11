import {Pressable, ScrollView, Text, View} from "react-native";
import SalavatSlider from "../components/SalavatSlider";
import {useEffect, useState} from "react";
import ZikirCounter from "../components/DhikrCounter.tsx";
import QuranTracker from "../components/QuranTracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JawshanViewPage from "../components/JawshanTracker.tsx";
import MemorizationTracker from "../components/MemorizationTracker.tsx";

type Dhikr = { name: string; target: number };


export default function TodayScreen() {
    const [salavatDone, setSalavatDone] = useState(false);


    const [dhikr, setDhikr] = useState<Dhikr | null>(null);
    useEffect(() => {
        const loadDhikr = async () => {
            try {
                const storedDhikr = await AsyncStorage.getItem('app:progress');
                if (!storedDhikr) return;

                const parsed = JSON.parse(storedDhikr);
                if (parsed?.dhikr?.active) {
                    setDhikr({
                        name: typeof parsed.dhikr.dhikrName === "string" ? parsed.dhikr.dhikrName : "",
                        target: Number(parsed.dhikr.dailyTarget),
                    });
                } else {
                    setDhikr(null);
                }
            }
            catch (error) {
                console.error('Zikir yukleme hatasi:', error);
            }
        }

        loadDhikr();
    }, []);


    // Quran and Jawshan toggles
    const [openQuran, setOpenQuran] = useState(false);
    const [openJawshan, setOpenJawshan] = useState(false);
    const [openMemorization, setOpenMemorization] = useState(false);


    return (

        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20 }}
        >


        {/* Salawat – always */}
            <Text> </Text>
            <SalavatSlider
                label="Peygamberimize selam gönder."
                disabled={salavatDone}
                onUnlock={() => setSalavatDone(true)}
            />
            {salavatDone && <Text>Salavat gönderildi!</Text>}

            {/* Dhikr – optional */}
            {dhikr && (
                <View style={{ marginTop: 20 }}>
                    <Text>{dhikr.name}</Text>
                    <ZikirCounter target={dhikr.target} name={dhikr.name} />
                </View>
            )}

            {/* Quran */}
            <Pressable onPress={() => setOpenQuran(prev => !prev)}>
                <Text
                >{openQuran ? "Kuran Sayfasini kapa⌃⌃⌃⌃⌃⌃" : "Kuran Sayfasini ac⌄⌄⌄⌄⌄"}</Text>
            </Pressable>

            {openQuran && (
                <View>
                    <QuranTracker />
                </View>
            )}



            <Pressable onPress={() => setOpenJawshan(prev => !prev)}>
                <Text
                >{openJawshan ? "Cevsen Sayfasini kapa⌃⌃⌃⌃⌃⌃" : "Cevsen Sayfasini ac⌄⌄⌄⌄⌄"}</Text>
            </Pressable>

            {openJawshan && (
                <View>
                    <JawshanViewPage />
                </View>
            )}



            <Pressable onPress={() => setOpenMemorization(prev => !prev)}>
                <Text
                >{openMemorization ? "Memorization Sayfasini kapa⌃⌃⌃⌃⌃⌃" : "Memorization Sayfasini ac⌄⌄⌄⌄⌄"}</Text>
            </Pressable>

            {openMemorization && (
            <View>
                <MemorizationTracker />
            </View>
             )

            }
        </ScrollView>

    );
}
