import {Pressable, ScrollView, Text, View} from "react-native";
import SalavatSlider from "../components/SalavatSlider";
import DhikrCounter from "../components/DhikrCounter.tsx";
import QuranTracker from "../components/QuranTracker";

import JawshanViewPage from "../components/JawshanTracker.tsx";
import MemorizationTracker from "../components/MemorizationTracker.tsx";
import {useState} from "react";



export default function TodayScreen() {
    const [salavatDone, setSalavatDone] = useState(false);

    // Recipes toggles
    const [openDhikr, setOpenDhikr] = useState(false);
    const [openQuran, setOpenQuran] = useState(false);
    const [openJawshan, setOpenJawshan] = useState(false);
    const [openMemorization, setOpenMemorization] = useState(false);

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20 }}
        >

            {/* Salawat – always */}
            <SalavatSlider
                label="Peygamberimize selam gönder."
                disabled={salavatDone}
                onUnlock={() => setSalavatDone(true)}
            />


            {/* Dhikr – optional */}
            <Pressable onPress={() => setOpenDhikr(prev => !prev)}>
                <Text
                >{openDhikr ? "Zikir Sayfasini kapa⌃⌃⌃⌃⌃⌃" : "Zikir Sayfasini ac⌄⌄⌄⌄⌄"}</Text>
            </Pressable>

            {openDhikr && (
                <View>
                    <DhikrCounter />
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
             )}

        </ScrollView>

    );
}
