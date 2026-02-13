import {useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";



type DhikrProps = {
    target?: number;
    name?: string;
};

type Dhikr ={
    name?: string,
    target?: number
};


export default function DhikrCounter({target, name}: DhikrProps) {

    // Navigation
    const navigation = useNavigation<any>();
    const [active, setActive] = useState(true);


    const [dhikr, setDhikr] = useState<Dhikr | null>(null);



    const [todayCount, setTodayCount] = useState(0);
    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem("app:progress");
            if (!raw) return;

            const progress = JSON.parse(raw);

            setTodayCount(progress.dhikr?.todayCount ?? 0);
            setActive(progress.dhikr?.active !== false);

            if (progress?.dhikr?.active === false) {
                setDhikr(null);
                return;
            }

            setDhikr({
                name: typeof progress.dhikr?.dhikrName === "string" ? progress.dhikr.dhikrName : "",
                target: Number(progress.dhikr?.dailyTarget ?? 0),
            });
        };

        load();
    }, []);


    const usedTarget = target ?? dhikr?.target ?? 0;
    const usedName = name ?? dhikr?.name ?? "Zikir";
    const done: boolean = todayCount >= usedTarget;

    async function onDhikrPress() {
        if (todayCount >= usedTarget) return;

        const raw = await AsyncStorage.getItem('app:progress');
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.dhikr = progress.dhikr ?? {};



        const current = Number(progress.dhikr.todayCount ?? 0);
        progress.dhikr.todayCount = current + 1;

        await AsyncStorage.setItem('app:progress', JSON.stringify(progress));
        setTodayCount(current + 1);

    }

    if (!active)
        return (
            <Text>
                Zikir kapali.  Zikr'i malzemelere eklemek icin -{">"} {" "}
                <Text
                    onPress={() => navigation.navigate("Recipe")}
                    style={{ color: "blue", textDecorationLine: "underline" }}
                >
                    Malzemeleri ayarla
                </Text>
            </Text>
        );

    if (!dhikr)
        return (
            <Text>Zikir kapali. Recipe’den aktif et.</Text>
        );



    return (


        <View>
            <Text>{todayCount} / {usedTarget}</Text>
            <Button
                title={`${usedName} +1`}
                onPress={onDhikrPress}
                    disabled={done}
            />
            {done && <Text>Allah kabul etsin</Text>}
            {/*TODO: For future: max 3 Zikir. + Some zikir has explanation*/}
                </View>

    );
}