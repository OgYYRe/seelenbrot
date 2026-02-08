import {useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


type DhikrProps = {
    target: number;
    name?: string;
};


export default function DhikrCounter({target, name}: DhikrProps) {

    const [todayCount, setTodayCount] = useState(0);
    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem("app:progress");
            if (!raw) return;

            const progress = JSON.parse(raw);
            const storedCount = progress.dhikr?.todayCount ?? 0;
            setTodayCount(storedCount);
        };

        load();
    }, []);

    const done: boolean = todayCount >= target;

    async function onDhikrPress() {
        if (todayCount >= target) return;

        const raw = await AsyncStorage.getItem('app:progress');
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.dhikr = progress.dhikr ?? {};


        const current = progress.dhikr.todayCount ?? 0;
        progress.dhikr.todayCount = current + 1;

        await AsyncStorage.setItem('app:progress', JSON.stringify(progress));
        setTodayCount(current + 1);

    }

    return (


        <View>
            <Text>{todayCount} / {target}</Text>
            <Button
                title={`${name ?? "Zikir"} +1`}
                onPress={onDhikrPress}
                    disabled={done}
            />
            {done && <Text>Allah kabul etsin</Text>}
            {/*TODO: For future: max 3 Zikir. + Some zikir has explanation*/}
                </View>

    );
}