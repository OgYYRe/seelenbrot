import {Alert, Text, View} from "react-native";
import { useEffect, useState} from "react";

import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LAST_PAGE_KEY = 'quran:lastPage'

export default function QuranTracker(){


    const [checkedPage, setCheckedPage] = useState<number>(0)
    const currentPage = checkedPage + 1;

    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        const loadLastPage = async ()=>{
            const stored = await AsyncStorage.getItem(LAST_PAGE_KEY);
            if (stored){
                const parsed = JSON.parse(stored);
                setCheckedPage(parsed.quran);
            }
        };
        loadLastPage();
    }, []);

    const handleCheckChange = async (value: boolean) => {
        if (!value) return;
        setChecked(true);
        Alert.alert(
            'Onay',
            `${currentPage}. sayfayi okudunuz mu?`,
            [
                {
                    text: 'Iptal',
                    onPress: ()=> {
                        console.log('Iptal edildi')
                        setChecked(false);
                    },
                    style: 'cancel',
                    isPreferred: true
                },
                {
                    text: 'Evet',
                        onPress: async ()=> {
                        console.log('Evet onaylandi');
                        const nextPage = checkedPage +1;
                        setCheckedPage(nextPage);
                        await AsyncStorage.setItem(LAST_PAGE_KEY, JSON.stringify({quran: nextPage}));
                        setChecked(false);
                        },
                    style: 'default',
                },
            ],
        );


    }


    return (
        <View>
        <Text>Quran Tracker Component</Text>

            <Text>
                <Text>{currentPage}. Sayfa</Text>
            </Text>

            <Text>
                Burada current sayfa ekrana basilacak
            </Text>

            <View>
                <CheckBox
                    disabled={false}
                    value={checked}
                    onValueChange={handleCheckChange}
                />

                <Text>{currentPage}. Sayfayi okudum ✔</Text>
            </View>

        </View>
    );
}