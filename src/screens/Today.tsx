import {Pressable, Text, View} from "react-native";
import SalavatSlider from "../components/SalavatSlider";
import {useEffect, useState} from "react";
import ZikirCounter from "../components/ZikirCounter";
import QuranTracker from "../components/QuranTracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CevsenViewPage from "../components/CevsenViewPage.tsx";

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


    // Quran and Cevsen toggles
    const [openQuran, setOpenQuran] = useState(false);
    const [openCevsen, setOpenCevsen] = useState(false);


    return (

        <View style={{ padding: 20 }}>
            {/* Salavat – always */}
            <Text>Salavat</Text>
            <SalavatSlider
                label="Peygamberimize selam gönder."
                disabled={salavatDone}
                onUnlock={() => setSalavatDone(true)}
            />
            {salavatDone && <Text>Salavat gönderildi!</Text>}

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

            {/* Dhikr – optional */}
            {dhikr && (
                <View style={{ marginTop: 20 }}>
                    <Text>{dhikr.name}</Text>
                    <ZikirCounter target={dhikr.target} name={dhikr.name} />
                </View>
            )}

            <Pressable onPress={() => setOpenCevsen(prev => !prev)}>
                <Text
                >{openCevsen ? "Cevsen Sayfasini kapa⌃⌃⌃⌃⌃⌃" : "Cevsen Sayfasini ac⌄⌄⌄⌄⌄"}</Text>
            </Pressable>

            {openCevsen && (
                <View>
                    <CevsenViewPage />
                </View>
            )}
        </View>
    );
}
