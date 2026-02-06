import { Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DebugScreen() {
    const [debugData, setDebugData] = useState<any>({});

    useEffect(() => {
        const loadDebugData = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const pairs = await AsyncStorage.multiGet(keys); // [[key, value], ...]

                const data: Record<string, any> = {};
                for (const [k, v] of pairs) {
                    if (v == null) {
                        data[k] = null;
                        continue;
                    }
                    // Wenn JSON: parse, sonst String lassen
                    try {
                        data[k] = JSON.parse(v);
                    } catch {
                        data[k] = v;
                    }
                }

                setDebugData({ keys, data });
            } catch (e) {
                setDebugData({ error: String(e) });
            }
        };

        void loadDebugData();
    }, []);

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text>DEBUG STORAGE</Text>
            <Text>{JSON.stringify(debugData, null, 2)}</Text>
        </ScrollView>
    );
}
