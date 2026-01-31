import {Button, Text, TextInput, View} from "react-native";
import {useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RECIPE_SETTINGS_KEY = 'recipe:settings';

export default function RecipeScreen() {

    const saveHandlerSettings = async () => {
        // first create object
        try {
        const dataToSave = {
            options: optionsForRecipe,
            zikir: {
                name: zikirName,
                amount: zikirAmount,
            },
        };


        // second object save ( AsyncStorage.setItem )

        await AsyncStorage.setItem(RECIPE_SETTINGS_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Kaydetme hatasi:', error
            + 'Lütfen üreticiyle iletişime geçin.');
    }
}


    const [optionsForRecipe, setOptionsForRecipe] = useState({
        zikir: false,
        kuran: false,
        cevsen: false,
        ezber: false,
    });



    const[zikirName, setzikirName] = useState('');
    const[zikirAmount, setzikirAmount] = useState('');


    return (
        <View>
            <Text>Ruhun Gidasi Tarif Menüsü</Text>

            {/* Zikir place */}
            <Text>Zikir olsun</Text>
            <CheckBox
                value={optionsForRecipe.zikir}
                onValueChange={(value) =>
                    setOptionsForRecipe(prev =>({
                        ...prev,
                        zikir: value,
                    }))
                }
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
                        onPress={saveHandlerSettings}
                        title = "+ Tarif'e Ekle"
                        color = 'green'
                    />
                </View>
            )}







            {/* Kuran place */}
            <Text>Kuran-i Kerim olmazsa olmaz</Text>
            <CheckBox
                value={optionsForRecipe.kuran}
                onValueChange={(value) =>
            setOptionsForRecipe(prev =>({
                ...prev,
                kuran: value,
            }))
            }
            />

            {/* Cevsen place */}
            <Text>Cevsen de okurum...(Haftada 1 tane biter)</Text>
            <CheckBox
                value={optionsForRecipe.cevsen}
                onValueChange={(value) =>
                    setOptionsForRecipe(prev =>({
                        ...prev,
                        cevsen: value,
                    }))
                }
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