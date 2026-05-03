import {Alert, Text, TextInput} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import {useTranslation} from "react-i18next";

const PROGRESS_KEY = 'app:progress';

export default function RecipeScreen() {
    const { t } = useTranslation();

    const [active, setActive] = useState({
        dhikr: false,
        quran: false,
        jawshan: false,
        memorization: false,
    });

    // Quran states
    const[quranTargetInput, setQuranTargetInput] = useState('');
    const[quranTotalInput, setQuranTotalInput] = useState('');
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
        const daily = Number(quranTargetInput.trim());
        // Quran DailyTarget validation
        // Check if the input is empty
        if (!quranTargetInput.trim()) {
            Alert.alert(t("alert_missing"), t("alert_quran_target_empty"));
            return;
        }
        // Check if the input is a valid number
        if (Number.isNaN(daily) || daily <= 0) {
            Alert.alert(t("alert_error"), t("alert_quran_target_invalid"));
            return;
        }
        // Check if the input is an integer
        if (!quranTotalInput.trim()) {
            Alert.alert(t("alert_missing"), t("alert_quran_start_empty"));
            return;
        }



        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);
        const startPage = Number(quranTotalInput.trim());

        // Start page validation
        // Check if the input is a valid number
        if (Number.isNaN(startPage)) {
            Alert.alert(t("alert_error"), t("alert_quran_start_nan"));
            return;
        }
        // Check if the input is an integer and greater than 0
        if (startPage < 1) {
            Alert.alert(t("alert_error"), t("alert_quran_start_invalid"));
            return;
        }


        // If validations pass, save the settings
        progress.quran = {
            ...progress.quran,
            dailyTarget: Number(quranTargetInput.trim()),
            total: Math.max(0, startPage - 1),
            todayCount: 0,
        };



        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        Alert.alert(t("alert_success"), t("alert_quran_saved"));
    }
    // Dhikr save function
    const saveDhikrHandler = async () => {
        if (!dhikrNameInput.trim() || !dailyDhikrTargetInput.trim()) {
            Alert.alert(t("alert_missing"), t("alert_dhikr_empty"));
            return;
        }
        if (Number.isNaN(Number(dailyDhikrTargetInput.trim()))) {
            Alert.alert(t("alert_error"), t("alert_dhikr_invalid"));
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
        Alert.alert(t("alert_success"), t("alert_dhikr_saved"));



}
    // Jawshan save function
    const saveJawshanHandler = async () => {
        if (!jawshanTargetInput.trim()) {
            Alert.alert(t("alert_missing"), t("alert_jawshan_empty"));
            return;
        }
        if (Number.isNaN(Number(jawshanTargetInput.trim()))) {
            Alert.alert(t("alert_error"), t("alert_jawshan_invalid"));
            return;
        }
        const raw = await AsyncStorage.getItem(PROGRESS_KEY);
        if (!raw) return;

        const progress = JSON.parse(raw);

        progress.jawshan = {
            ...progress.jawshan,
            dailyTarget: Number(jawshanTargetInput.trim()),
            todayCount: 0
        }

        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        Alert.alert(t("alert_success"), t("alert_jawshan_saved"));

    }
    // Memorization save function
    const saveMemorizationHandler = async () => {
        if (!memizationSurahInput.trim() || !memorizationStartTargetInput.trim() || !memorizationEndTargetInput.trim()) {
            Alert.alert(t("alert_missing"), t("alert_memorization_empty"));

            return;
        }
        if (Number.isNaN(Number(memizationSurahInput.trim())) || Number.isNaN(Number(memorizationStartTargetInput.trim())) || Number.isNaN(Number(memorizationEndTargetInput.trim()))) {
            Alert.alert(t("alert_error"), t("alert_memorization_invalid"));

            return;
        }
        const start = Number(memorizationStartTargetInput.trim());
        const end = Number(memorizationEndTargetInput.trim());
        if (start > end) {
            Alert.alert(t("alert_error"), t("alert_memorization_range_invalid"));
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

        Alert.alert(t("alert_success"), t("alert_memorization_saved"));

    }


    // Reset function
    const createDefaultProgress = () => {
        const today = new Date().toISOString().slice(0, 10);

        return {
            lastResetDate: today,

            quran: {
                active: true,
                dailyTarget: 2,
                todayCount: 0,
                total: 0
            },

            jawshan: {
                active: true,
                dailyTarget: 15,
                todayCount: 0,
                total: 0
            },

            salawat: {
                active: true,
                dailyTarget: 1,
                todayCount: 0,
                doneToday: false
            },

            dhikr: {
                active: true,
                dhikrName: "Ya Latif",
                dailyTarget: 129,
                todayCount: 0
            },

            memorization: {
                active: true,
                surahNumber: 13,
                ayahStart: 28,
                ayahEnd: 28,
                dailyTarget: 3,
                todayCount: 0,
                total: 0
            }
        };
    };

    const handleReset = () => {
        Alert.alert(
            t("alert_reset_title"),
            t("alert_reset_confirm"),
            [
                {
                    text: t("alert_reset_cancel"),
                    style: "cancel",
                    isPreferred: true,
                },
                {
                    text: t("alert_reset_action"),
                    style: "destructive",
                    onPress: async () => {
                        const defaultProgress = createDefaultProgress();
                        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultProgress));
                        Alert.alert(t("alert_success"), t("alert_reset_done"));
                    },
                },
            ],
        );
    };




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

            // Dhikr inputs, only if dhikr is active
            if (progress.dhikr?.active)
                if (typeof progress.dhikr.dhikrName === "string") {
                    setDhikrNameInput(progress.dhikr.dhikrName);
                }

            if (typeof progress.dhikr.dailyTarget === "number") {
                setDailyDhikrTargetInput((String(progress.dhikr.dailyTarget)));
            }

            // Memorization inputs, only if memorization is active
            if (progress.memorization) {
                const mem = progress.memorization;
                if (typeof mem.surahNumber === "number") {
                    setMemorizationSurahInput(String(mem.surahNumber));
                }
                if (typeof mem.ayahStart === "number") {
                    setMemorizationTargetInput(String(mem.ayahStart));
                }
                if (typeof mem.ayahEnd === "number") {
                    setMemorizationEndTargetInput(String(mem.ayahEnd));
                }
            }

            // Quran inputs, only if Quran is active
            if (progress.quran) {
                const quran = progress.quran;
                if (typeof quran.dailyTarget === "number") {
                    setQuranTargetInput(String(quran.dailyTarget));
                }
                if (typeof quran.total === "number") {
                    setQuranTotalInput(String(quran.total + 1));
                }
            }

            // Jawshan inputs, only if jawshan is active
            if (progress.jawshan) {
                const jawshan = progress.jawshan;
                if (typeof jawshan.dailyTarget === "number") {
                    setJawshanTargetInput(String(jawshan.dailyTarget));
                }
             }

        }

        load();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.title}>{t("recipe_title")}</Text>

                {/* Dhikr place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("recipe_dhikr_title")}
                        </Text>
                        <CheckBox
                            value={active.dhikr}
                            onValueChange={checkBoxDhikrHandler}
                            tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.dhikr && (
                        <View style={styles.cardBody}>
                            <Text style={styles.smallText}>
                                {t("recipe_dhikr_desc")}
                            </Text>
                            <TextInput
                                value={dhikrNameInput}
                                onChangeText={setDhikrNameInput}
                                placeholder={t("recipe_dhikr_placeholder1")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <TextInput
                                value={dailyDhikrTargetInput}
                                onChangeText={setDailyDhikrTargetInput}
                                keyboardType={"numeric"}
                                placeholder={t("recipe_dhikr_placeholder2")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveDhikrHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>
                                    {t("recipe_dhikr_button")}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Quran place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("recipe_quran_title")}
                        </Text>
                        <CheckBox
                            value={active.quran}
                            onValueChange={checkBoxQuranHandler}
                            tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.quran && (
                        <View style={styles.cardBody}>
                            <Text style={styles.smallText}>
                                {t("recipe_quran_desc")}
                            </Text>
                            <Text style={styles.smallText}>
                                {t("recipe_quran_label1")}
                            </Text>
                            <TextInput
                                value={quranTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setQuranTargetInput}
                                placeholder={t("recipe_quran_placeholder1")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />
                            <Text style={styles.smallText}>
                                {t("recipe_quran_label2")}
                            </Text>
                            <TextInput
                                value={quranTotalInput}
                                keyboardType={"numeric"}
                                onChangeText={setQuranTotalInput}
                                placeholder={t("recipe_quran_placeholder2")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveQuranHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>
                                    {t("recipe_quran_button")}
                                    </Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Jawshan place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("recipe_jawshan_title")}
                        </Text>
                        <CheckBox
                            value={active.jawshan}
                            onValueChange={checkBoxJawshanHandler}
                            tintColors={{ true: colors.accentBlue, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.jawshan && (
                        <View style={styles.cardBody}>
                            <Text style={styles.smallText}>
                                {t("recipe_jawshan_desc")}
                            </Text>
                            <TextInput
                                value={jawshanTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setJawshanTargetInput}
                                placeholder={t("recipe_jawshan_placeholder")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveJawshanHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>
                                    {t("recipe_jawshan_button")}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>


                {/* Memorization place */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {t("recipe_memorization_title")}
                        </Text>
                        <CheckBox
                            value={active.memorization}
                            onValueChange={checkBoxMemorizationHandler}
                            tintColors={{ true: colors.accentGreen, false: 'rgba(255,255,255,0.4)'}}
                        />
                    </View>

                    {active.memorization && (
                        <View style={styles.cardBody}>
                            <Text style={styles.smallText}>
                                {t("recipe_memorization_desc")}
                            </Text>
                            <Text style={styles.smallText}>
                                {t("recipe_memorization_label1")}
                            </Text>
                            <TextInput
                                value={memizationSurahInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationSurahInput}
                                placeholder={t("recipe_memorization_placeholder1")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Text style={styles.smallText}>
                                {t("recipe_memorization_label2")}
                            </Text>

                            <TextInput
                                value={memorizationStartTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationTargetInput}
                                placeholder={t("recipe_memorization_placeholder2")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />
                            <Text style={styles.smallText}>
                                {t("recipe_memorization_label3")}
                            </Text>
                            <TextInput
                                value={memorizationEndTargetInput}
                                keyboardType={"numeric"}
                                onChangeText={setMemorizationEndTargetInput}
                                placeholder={t("recipe_memorization_placeholder3")}
                                placeholderTextColor={'rgba(255,255,255,0.5)'}
                                style={styles.input}
                            />

                            <Pressable onPress={saveMemorizationHandler} style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.primaryButtonText}>
                                    {t("recipe_memorization_button")}
                                    </Text>
                            </Pressable>
                        </View>

                    )}
                </View>

                <Pressable
                    onPress={handleReset}
                    style={({ pressed }) => [
                        styles.resetButton,
                        pressed && styles.resetPressed,
                    ]}
                >
                    <Text style={styles.resetText}>
                        {t("recipe_reset_button")}
                    </Text>
                </Pressable>



            </ScrollView>
        </SafeAreaView>
    )
}

const colors = {
    background: '#041219', // deeper dark navy
    card: '#072f36', // deep teal
    accentBlue: '#00ffff', // unified accent color
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

    smallText: { color: colors.textSecondary, fontSize: 12, marginBottom: 4 },

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
    primaryButtonText: { color: colors.textPrimary, fontWeight: '700' },

    resetButton: {
        marginTop: 40,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#8B0000',
        alignItems: 'center',
    },

    resetPressed: {
        opacity: 0.7,
    },

    resetText: {
        color: 'white',
        fontWeight: '700',
    }

});
