import {Alert, Text, View} from "react-native";
import { useEffect, useState} from "react";

import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuranPDFView from "./QuranPDFView.tsx";


const PROGRESS_KEY = 'app:progress'

export default function QuranTracker(){

    // Quran State for UI
    const [lastReadPage, setLastReadPage] = useState<number>(0)
    const currentPage = lastReadPage + 1;
    const [checked, setChecked] = useState(false);



    useEffect(() => {
        const loadLastPage = async ()=>{
            const stored = await AsyncStorage.getItem(PROGRESS_KEY);
            if (stored){
                const parsed = JSON.parse(stored);
                setLastReadPage(parsed.quran?.lastReadPage ?? 0);
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
                            progress.quran = { lastReadPage: 0 };
                        }
                        const nextPage = lastReadPage + 1;
                        progress.quran.lastReadPage = nextPage;
                        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
                        setLastReadPage(nextPage);
                        setChecked(false)

                    },
                    style: 'default',
                },
            ],
        );


    }


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