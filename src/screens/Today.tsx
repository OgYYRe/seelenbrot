import {Text, View } from "react-native";
import SalavatSlider from "../components/SalavatSlider";
import {useEffect, useState} from "react";
import ZikirCounter from "../components/ZikirCounter";
import QuranTracker from "../components/QuranTracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Zikir = { name: string; target: number };

const ZikirList: Zikir[] = [
    { name: "Salavat", target: 1 },
    { name: "Ya Latif", target: 4 },
];



export default function TodayScreen() {
    const [salavatDone, setSalavatDone] = useState(false);

    const [zikir, setZikir] = useState<Zikir | null>(null);
    useEffect(() => {
        const loadZikir = async () => {
            try {
                const storedZikir = await AsyncStorage.getItem('recipe:settings');
                if (!storedZikir) return;

                const parsed = JSON.parse(storedZikir);
                if (parsed?.options?.zikir) {
                    setZikir({
                        name: parsed.zikir.name,
                        target: Number(parsed.zikir.amount),

                    });
                }
            }
            catch (error) {
                console.error('Zikir yukleme hatasi:', error);
            }
        }

        loadZikir();
    }, []);


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

            {/* Zikir – optional */}

            {zikir && (
                <View style={{ marginTop: 20 }}>
                    <Text>{zikir.name}</Text>
                    <ZikirCounter target={zikir.target} name={zikir.name} />
                </View>
            )}

            {/* Quran */}
            <View style={{ marginTop: 20 }}>
                <QuranTracker />
            </View>
        </View>
    );
}
