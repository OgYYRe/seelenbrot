import {Alert, Button, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RECIPE_SETTINGS_KEY = 'recipe:settings';

export default function RecipeScreen() {

    // Options for recipe state
    const [optionsForRecipe, setOptionsForRecipe] = useState({
        zikir: false,
        kuran: false,
        cevsen: false,
        ezber: false,
    });

    // Zikir states
    const[zikirName, setzikirName] = useState('');
    const[zikirAmount, setzikirAmount] = useState('');



    // Zikir checkbox
    const checkBoxZikirHandler = (value: boolean) => {
        setOptionsForRecipe({
            ...optionsForRecipe,
            zikir: value,
        });
    };

    // Zikir save function
    const saveZikirHandler = async () => {
        if (optionsForRecipe.zikir) {
            if (!zikirName.trim() || !zikirAmount.trim()) {
                Alert.alert('Eksik', 'Zikir adi veya adet bos olamaz.');
                return;
            }
            if (Number.isNaN(Number(zikirAmount.trim()))) {
                Alert.alert('Hata', 'Zikir adeti sayi olmalidir.');
                return;
            }
        }

        // first create object
        try {
        const dataToSave = {
            options: optionsForRecipe,
            zikir: optionsForRecipe.zikir
            ? {
                name: zikirName,
                amount: zikirAmount,
            }: null,
            cevsen:{
                enabled: optionsForRecipe.cevsen,
            }
        };
        // second object save ( AsyncStorage.setItem )
        await AsyncStorage.setItem(RECIPE_SETTINGS_KEY, JSON.stringify(dataToSave));
        Alert.alert('Basarili', `${zikirName}x${zikirAmount} menüye eklendi.`);

        setzikirName('');
        setzikirAmount('');

    } catch (error) {
        console.error('Kaydetme hatasi:', error);
    }
}

    // Cevsen checkbox
    const checkBoxCevsenHandler = async (value: boolean) => {
        setOptionsForRecipe(prev => ({
            ...prev,
            cevsen: value,
        }));

        await AsyncStorage.setItem(
            RECIPE_SETTINGS_KEY,
            JSON.stringify({
                options: {
                    ...optionsForRecipe,
                    cevsen: value,
                },
                cevsen: { enabled: value },
            })
        );
    };



    // Kuran checkbox
    const checkBoxKuranHandler = async (value: boolean) => {
        setOptionsForRecipe({
            ...optionsForRecipe,
            kuran: value,
        });

        await AsyncStorage.setItem(
            RECIPE_SETTINGS_KEY,
            JSON.stringify({
                options: {
                    ...optionsForRecipe,
                    kuran: value,
                },
            })
        );
    }


    // Load saved settings
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const raw = await AsyncStorage.getItem(RECIPE_SETTINGS_KEY);
                if (!raw) return;

                const saved = JSON.parse(raw);

                if (saved?.options) {
                    setOptionsForRecipe(saved.options);
                }

                if (saved?.zikir) {
                    // if zikir exists, set zikir option to true
                    setOptionsForRecipe(prev => ({
                        ...prev,
                        zikir: true,
                    }));

                    if (typeof saved.zikir.name === 'string') setzikirName(saved.zikir.name);
                    if (typeof saved.zikir.amount === 'string') setzikirAmount(saved.zikir.amount);
                }
            } catch (e) {
                console.error('Okuma hatasi:', e);
            }
        };

        loadSettings();
    }, []);


    return (
        <View>
            <Text>Ruhun Gidasi Tarif Menüsü</Text>

            {/* Zikir place */}
            <Text>Zikir olsun</Text>
            <CheckBox
                value={optionsForRecipe.zikir}
                onValueChange={checkBoxZikirHandler}
            />

            {optionsForRecipe.zikir && (
                <View>
                    <TextInput
                        value={zikirName}
                        onChangeText={setzikirName}
                        placeholder={'Hangi zikir? (ör: Ya Latif)'}
                    />

                    <TextInput
                        value={zikirAmount}
                        onChangeText={setzikirAmount}
                        keyboardType={"numeric"}
                        placeholder="Kac adet? (ör: 129)"
                        />
                    <Button
                        onPress={saveZikirHandler}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>
            )}




            {/* Kuran place */}
            <Text>Kuran-i Kerim olmazsa olmaz</Text>
            <CheckBox
                value={optionsForRecipe.kuran}
                onValueChange={checkBoxKuranHandler}
            />

            {/* Cevsen place */}
            <Text>Cevsen de okurum...(Haftada 1 tane biter)</Text>
            <CheckBox
                value={optionsForRecipe.cevsen}
                onValueChange={checkBoxCevsenHandler}
            />



            {/* Ezber place */}
            <Text>Ezber de yapiyorum</Text>
            <CheckBox
                value={optionsForRecipe.ezber}
                onValueChange={(value) =>
                    setOptionsForRecipe(prev =>({
                        ...prev,
                        ezber: value,
                    }))
                }
            />

        </View>
    )
}