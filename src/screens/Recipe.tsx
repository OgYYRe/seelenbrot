import {Alert, Text, TextInput} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';

const PROGRESS_KEY = 'app:progress';

export default function RecipeScreen() {

    const [active, setActive] = useState({
        dhikr: false,
        quran: false,
        jawshan: false,
        memorization: false,
    });

    // Quran states
    const[quranTargetInput, setQuranTargetInput] = useState('');
    // Dhikr states
    const[dhikrNameInput, setDhikrNameInput] = useState('');
    const[dailyDhikrTargetInput, setDailyDhikrTargetInput] = useState('');
    // Jawshan states
    const[jawshanTargetInput, setJawshanTargetInput] = useState('');
    // Memorization states
    const [memizationSurahInput, setMemorizationSurahInput] = useState('');
    const [memorizationStartTargetInput, setMemorizationTargetInput] = useState('');
    const [memorizationEndTargetInput, setMemorizationEndTargetInput] = useState('');


    // Quran checkbox
    const checkBoxQuranHandler = async (value: boolean) => {
        setActive(prev => ({
            ...prev,
            quran: value,
        }));
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.quran.active = value;

        await AsyncStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(progress)
        );
    }
    // Dhikr checkbox
    const checkBoxDhikrHandler = async (value: boolean) => {
        setActive(prev => ({
            ...prev,
            dhikr: value,
        }));

        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.dhikr.active = value;

        await AsyncStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(progress)
        );
    }
    // Jawshan checkbox
    const checkBoxJawshanHandler = async (value: boolean) => {
        setActive(prev => ({
            ...prev,
            jawshan: value,
        }));
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.jawshan.active = value;

        await AsyncStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(progress)
        );
    }
    // Memorization checkbox
    const checkBoxMemorizationHandler = async (value: boolean) => {
        setActive(prev => ({
            ...prev,
            memorization: value,
        }));

        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        progress.memorization.active = value;

        await AsyncStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(progress)
        );
    }

    // Quran save function
    const saveQuranHandler = async () => {
        if (!dailyDhikrTargetInput.trim()) {
            Alert.alert('Eksik', 'Kuran hedefi bos olamaz.');
            return;
        }
        if (Number.isNaN(Number(quranTargetInput.trim()))) {
            Alert.alert('Hata', 'Kuran hedefi sayi olmalidir.');
            return;
        }
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);

        progress.quran = {
            ...progress.quran,
            dailyTargetPages: Number(quranTargetInput.trim()),
            todayCount: 0
        }

        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        Alert.alert('Basarili', `Kuran hedefi tarife eklendi`);
    }
    // Dhikr save function
    const saveDhikrHandler = async () => {
        if (!dhikrNameInput.trim() || !dailyDhikrTargetInput.trim()) {
            Alert.alert('Eksik', 'Zikir adi veya adet bos olamaz.');
            return;
        }
        if (Number.isNaN(Number(dailyDhikrTargetInput.trim()))) {
            Alert.alert('Hata', 'Zikir adeti sayi olmalidir.');
            return;
        }
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);

        progress.dhikr = {
            ...progress.dhikr,
            dhikrName: dhikrNameInput.trim(),
            dailyTarget: Number(dailyDhikrTargetInput.trim()),
            todayCount: 0
        }

        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        Alert.alert('Basarili', `${dhikrNameInput}Zikir tarife eklendi`);



}
    // Jawshan save function
    const saveJawshanHandler = async () => {
        if (!jawshanTargetInput.trim()) {
            Alert.alert('Eksik', 'Cevsen hedefi bos olamaz.');
            return;
        }
        if (Number.isNaN(Number(jawshanTargetInput.trim()))) {
            Alert.alert('Hata', 'Cevsen hedefi sayi olmalidir.');
            return;
        }
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);

        progress.jawshan = {
            ...progress.jawshan,
            dailyTargetBab: Number(jawshanTargetInput.trim()),
            todayCount: 0
        }

        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        Alert.alert('Basarili', `Cevsen hedefi tarife eklendi`);
    }
    // Memorization save function
    const saveMemorizationHandler = async () => {
        if (!memizationSurahInput.trim() || !memorizationStartTargetInput.trim() || !memorizationEndTargetInput.trim()) {
            Alert.alert('Eksik', 'Ezber hedefi bos olamaz.');
            return;
        }
        if (Number.isNaN(Number(memizationSurahInput.trim())) || Number.isNaN(Number(memorizationStartTargetInput.trim())) || Number.isNaN(Number(memorizationEndTargetInput.trim()))) {
            Alert.alert('Hata', 'Ezber hedefi sayi olmalidir.');
            return;
        }
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);

        progress.memorization = {
            ...progress.memorization,
            surahNumber: Number(memizationSurahInput.trim()),
            ayahStart: Number(memorizationStartTargetInput.trim()),
            ayahEnd: Number(memorizationEndTargetInput.trim()),
            todayCount: 0
        }

        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        Alert.alert('Basarili', `Ezber hedefi tarife eklendi`);
    }








    // Load saved settings
    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(PROGRESS_KEY);
            if (!raw) return;

            const progress = JSON.parse(raw);

            setActive({
                dhikr: progress.dhikr?.active || false,
                quran: progress.quran?.active || false,
                jawshan: progress.jawshan?.active || false,
                memorization: progress.memorization?.active || false,
            });

            if (progress.dhikr?.active)
                if (typeof progress.dhikr.dhikrName === "string") {
                    setDhikrNameInput(progress.dhikr.dhikrName);
                }

            if (typeof progress.dhikr.dailyTarget === "number") {
                setDailyDhikrTargetInput((String(progress.dhikr.dailyTarget)));
            }
        }

        load();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.title}>Ruhun Gıdası — Malzemeler</Text>

                {/* Dhikr place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Zikir</Text>
                        <CheckBox
                            value={active.dhikr}
                            onValueChange={checkBoxDhikrHandler}
                            tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.dhikr && (
                        <View style={styles.cardBody}>
                            <TextInput
                                value={dhikrNameInput}
                                onChangeText={setDhikrNameInput}
                                placeholder={'Hangi zikir? (ör: Ya Latif)'}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <TextInput
                                value={dailyDhikrTargetInput}
                                onChangeText={setDailyDhikrTargetInput}
                                keyboardType={"numeric"}
                                placeholder="Kaç adet? (ör: 129)"
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveDhikrHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>+ Tarife Ekle</Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Quran place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Kuran-i Kerim</Text>
                        <CheckBox
                            value={active.quran}
                            onValueChange={checkBoxQuranHandler}
                            tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.quran && (
                        <View style={styles.cardBody}>
                            <TextInput
                                value={quranTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setQuranTargetInput}
                                placeholder={'Günde kaç sayfa? (ör: 2)'}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveQuranHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>+ Tarife Ekle</Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Jawshan place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Cevsen</Text>
                        <CheckBox
                            value={active.jawshan}
                            onValueChange={checkBoxJawshanHandler}
                            tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.jawshan && (
                        <View style={styles.cardBody}>
                            <TextInput
                                value={jawshanTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setJawshanTargetInput}
                                placeholder={'Günde kaç bab? (ör: 15)'}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveJawshanHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>+ Tarife Ekle</Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Memorization place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Ezber</Text>
                        <CheckBox
                            value={active.memorization}
                            onValueChange={checkBoxMemorizationHandler}
                            tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.memorization && (
                        <View style={styles.cardBody}>
                            <TextInput
                                value={memizationSurahInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationSurahInput}
                                placeholder={`Kaçıncı sure? ör: Ra'd=13, Bakara=2`}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />
                            <TextInput
                                value={memorizationStartTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationTargetInput}
                                placeholder={'Ayet başlangıç numarası? (ör: 28)'}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />
                            <TextInput
                                value={memorizationEndTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationEndTargetInput}
                                placeholder={'Ayet bitiş numarası? (ör: 28)'}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveMemorizationHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>+ Tarife Ekle</Text>
                            </Pressable>
                        </View>

                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const colors = {
    background: '#041219', // deeper dark navy
    card: '#072f36', // deep teal
    accentBlue: '#0f5b83', // slightly brighter deep blue
    accentGreen: '#1f7a3a', // deep green
    buttonBg: '#072a2e',
    textPrimary: '#e6f7ff',
    textSecondary: '#97c9d6',
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, paddingBottom: 40 },
    title: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginBottom: 12 },

    card: {
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 6,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    cardTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
    cardBody: { },

    input: {
        backgroundColor: '#052026',
        color: colors.textPrimary,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)'
    },

    primaryButton: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: colors.accentGreen,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonPressed: { opacity: 0.95, transform: [{ scale: 0.998 }] },
    primaryButtonText: { color: colors.textPrimary, fontWeight: '700' }
});
