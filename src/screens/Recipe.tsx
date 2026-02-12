import {Alert, Button, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";




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
        <View>
            <Text>Ruhun Gidasi Malzemeler</Text>

            {/* Dhikr place */}
            <Text>Zikir olsun</Text>
            <CheckBox
                value={active.dhikr}
                onValueChange={checkBoxDhikrHandler}
            />

            {active.dhikr && (
                <View>
                    <TextInput
                        value={dhikrNameInput}
                        onChangeText={setDhikrNameInput}
                        placeholder={'Hangi zikir? (ör: Ya Latif)'}
                    />

                    <TextInput
                        value={dailyDhikrTargetInput}
                        onChangeText={setDailyDhikrTargetInput}
                        keyboardType={"numeric"}
                        placeholder="Kac adet? (ör: 129)"
                        />
                    <Button
                        onPress={saveDhikrHandler}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>
            )}




            {/* Quran place */}
            <Text>Kuran-i Kerim olmazsa olmaz</Text>
            <CheckBox
                value={active.quran}
                onValueChange={checkBoxQuranHandler}
            />

            {active.quran && (
                <View>
                    <TextInput
                        value={quranTargetInput}
                        keyboardType={"numeric"}
                        onChangeText={setQuranTargetInput}
                        placeholder={'Gunde kac sayfa? (ör: 2)'}
                    />

                    <Button
                        onPress={saveQuranHandler}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>
            )}

            {/* Jawshan place */}
            <Text>Cevsen de okurum...(Haftada 1 tane biter)</Text>
            <CheckBox
                value={active.jawshan}
                onValueChange={checkBoxJawshanHandler}
            />

            {active.jawshan && (
                <View>
                    <TextInput
                        value={jawshanTargetInput}
                        keyboardType={"numeric"}
                        onChangeText={setJawshanTargetInput}
                        placeholder={'Günde kaç bab? (ör: 15)'}
                    />

                    <Button
                        onPress={saveJawshanHandler}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>
            )}


            {/* Memorization place */}
            <Text>Ezber de yapayim</Text>
            <CheckBox
                value={active.memorization}
                onValueChange={checkBoxMemorizationHandler}
            />
            {active.memorization && (
                <View>
                    <TextInput
                        value={memizationSurahInput}
                        keyboardType={"numeric"}
                        onChangeText={setMemorizationSurahInput}
                        placeholder={`Kacinci sure? ör: Ra'd=13, Bakara=2`}
                    />
                    <TextInput
                        value={memorizationStartTargetInput}
                        keyboardType={"numeric"}
                        onChangeText={setMemorizationTargetInput}
                        placeholder={'Ayet baslangic numarasi? (ör: 28)'}
                    />
                    <TextInput
                        value={memorizationEndTargetInput}
                        keyboardType={"numeric"}
                        onChangeText={setMemorizationEndTargetInput}
                        placeholder={'Ayet bitis numarasi? (ör: 28)'}
                    />
                    <Button
                        onPress={saveMemorizationHandler}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>

            )}

        </View>
    )
}