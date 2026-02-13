import {Alert, Text, View} from "react-native";
import { useEffect, useState} from "react";

import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuranPDFView from "./QuranPDFView.tsx";
import { useNavigation } from "@react-navigation/native";



const PROGRESS_KEY = 'app:progress'

export default function QuranTracker(){

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
                setActive(Boolean(parsed.quran?.active));
            }
        };
        loadLastPage();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) return;

        Alert.alert(
            'Onay',
            `${currentPage}. sayfayi okudunuz mu?`,
            [
                {
                    text: 'Iptal',
                    onPress: ()=> {
                        console.log('Iptal edildi')
                        setChecked(false)
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
                        if (!progress.quran) {
                            progress.quran = { total: 0 };
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
            <Text>
                Kuran-i Kerim kapali. Kuran-i Kerim'i malzemelere eklemek icin -{">"} {" "}
                <Text
                    onPress={() => navigation.navigate("Recipe")}
                    style={{ color: "blue", textDecorationLine: "underline" }}
                >
                    Malzemeleri ayarla
                </Text>
            </Text>
        );


    return (
        <View>

            <Text>
                <Text>{currentPage}. Sayfa</Text>
            </Text>

            <QuranPDFView page={currentPage} />

            <View>
                <CheckBox
                    value={checked}
                    onValueChange={(v) => {
                        setChecked(v);
                        handleCheckChange(v);
                    }}
                />
                <Text>{currentPage}. Sayfayi okudum ✔</Text>
            </View>

        </View>
    );
}