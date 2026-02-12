import React, { JSX, useEffect, useState } from "react";
import {Alert, Button, ScrollView, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_KEY = "app:progress";
const quran = require("../../assets/quran.json");


type Memorization = {
    active: boolean;
    surahNumber: number;
    ayahStart: number;
    ayahEnd: number;
    dailyTarget?: number;
    todayCount?: number;
    total?: number;
};

export default function MemorizationTracker(): JSX.Element {
    const [memorization, setMemorization] = useState<Memorization | null>(null);
    const [loaded, setLoaded] = useState(false);


    // Text state for the memorization piece
    const [pieceText, setPieceText] = useState("");

    // Counter states
    const [todayCount, setTodayCount] = useState(0);


    // Counter function
    const  handleCounter= async () => {
        if (!memorization) return;

        const target = Number(memorization.dailyTarget ?? 0);
        if (!target || target <= 0) {
            Alert.alert("Hata", "dailyTarget ayarlanmis degil.");
            return;
        }

        if (todayCount >= target) return;

        const next = todayCount + 1;
        setTodayCount(next);

        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        if (!progress.memorization) progress.memorization = {};

        progress.memorization.todayCount = next;
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        if (next === target) {
            Alert.alert("Tamam", "Bugunluk ezber hedefi tamam. Yarin tekrar gorusuruz.");
        }
    };


    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(PROGRESS_KEY);
            if (!raw) {
                setLoaded(true);
                return;
            }

            const progress = JSON.parse(raw);
            const mem = progress.memorization;

            if (!mem) {
                setLoaded(true);
                return;
            }

            setMemorization({
                active: Boolean(mem.active),
                surahNumber: Number(mem.surahNumber),
                ayahStart: Number(mem.ayahStart),
                ayahEnd: Number(mem.ayahEnd),
                dailyTarget: mem.dailyTarget != null ? Number(mem.dailyTarget) : undefined,
                todayCount: mem.todayCount != null ? Number(mem.todayCount) : 0,
                total: mem.total != null ? Number(mem.total) : 0,
            });
            const normalizedToday = mem.todayCount != null ? Number(mem.todayCount) : 0;
            setTodayCount(normalizedToday);


            setLoaded(true);
        };

        load();
    }, []);

    useEffect(() => {
        if (!memorization || !memorization.active) return;

        const start = memorization.ayahStart;
        const end = memorization.ayahEnd;

        if (start > end) {
            setPieceText("Hata: Ayet baslangici bitisten buyuk olamaz.");

            return;
        }

        const list = quran
            .filter((x: any) => x.sura === memorization.surahNumber && x.aya >= start && x.aya <= end)
            .sort((a: any, b: any) => a.aya - b.aya);

        const text = list.map((a: any) => `${a.aya}. ${a.text}`).join("\n\n");

        setPieceText(text);

    }, [memorization]);


    if (!loaded) return <Text>Yukleniyor...</Text>;

    if (!memorization) return <Text>Memorization ayari bulunamadi.</Text>;

    if (!memorization.active) return <Text>Memorization kapali.</Text>;

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <View>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                    Memorization (Aktif)
                </Text>

                <Text>Sure: {memorization.surahNumber}</Text>
                <Text>Ayet araligi: {memorization.ayahStart}-{memorization.ayahEnd}</Text>






                <Text style={{ marginTop: 12 }}>
                    {todayCount}/{memorization.dailyTarget}
                </Text>


                <Text
                    selectable
                    style={{
                        marginTop: 12,
                        fontSize: 22,
                        lineHeight: 40,
                        textAlign: "right",
                        writingDirection: "rtl",
                        padding: 14,
                        borderRadius: 12,
                        backgroundColor: "#f2f2f2",
                    }}
                >
                    {pieceText}
                </Text>


                <Button
                    title="Okudum (+) "
                    onPress={handleCounter}
                    disabled={todayCount >= Number(memorization.dailyTarget ?? 0)}
                />


            </View>
        </ScrollView>
    );
}
