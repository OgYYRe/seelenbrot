import { Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DebugScreen() {
    const [debugData, setDebugData] = useState<any>({});

    useEffect(() => {
        const loadDebugData = async () => {
            const quran = await AsyncStorage.getItem("quran:lastPage");
            const recipe = await AsyncStorage.getItem("recipe:settings");

            setDebugData({
                quran: quran ? JSON.parse(quran) : null,
                recipe: recipe ? JSON.parse(recipe) : null,
            });
        };

        loadDebugData();
    }, []);

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text>DEBUG STORAGE</Text>

            <Text>
                {JSON.stringify(debugData, null, 2)}
            </Text>
        </ScrollView>
    );
}
