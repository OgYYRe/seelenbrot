import React, {JSX, useEffect, useState} from "react";
import {Alert, ScrollView, Text, View} from "react-native";
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
            <Text>
                Cevsen kapali. Cevsen'i malzemelere eklemek icin -{">"} {" "}
                <Text
                    onPress={() => navigation.navigate("Recipe")}
                    style={{ color: "blue", textDecorationLine: "underline" }}
                >
                    Malzemeleri ayarla
                </Text>
            </Text>
        );



    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        >
            <View>

                <Text>
                    <Text>{currentBab}. Bab</Text>
                </Text>

                <JawshanView babNumber={currentBab} />

                <View>
                    <CheckBox
                        value={checked}
                        onValueChange={(v) => {
                            setChecked(v);
                            handleCheckChange(v);
                        }}
                    />
                    <Text>{currentBab}. Bab'i okudum ✔</Text>
                </View>

            </View>




        </ScrollView>

  );
}
