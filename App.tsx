import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/Home.tsx";
import TodayScreen from "./src/screens/Today.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RecipeScreen from "./src/screens/Recipe.tsx";
import DebugScreen from "./src/screens/Debug.tsx";
import SettingsScreen from "./src/screens/Settings.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";


const STORAGE_KEY = 'app:progress';
const DEFAULT_PROGRESS = {
    lastResetDate: "2026-02-05",

    quran: {
        active: true,
        lastReadPage: 0,
        dailyTargetPages: 2,
        todayReadPages: 0,
        dayStartPage: 0
    },

    jawshan: {
        active: true,
        lastReadBab: 0,
        dailyTargetBab: 15,
        todayReadBab: 0,
        dayStartBab: 0
    },

    salawat: {
        active: true,
        dailyTarget: 1,
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
        todayCount: 0
    }
};

async function initProgressStorage() {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (existing == null) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));

    }
}



const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        void initProgressStorage();
    }, []);

    return (
      <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Today" component={TodayScreen} />
              <Stack.Screen name="Recipe" component={RecipeScreen} />
              <Stack.Screen name="Debug" component={DebugScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />

          </Stack.Navigator>

      </NavigationContainer>

      </GestureHandlerRootView>
  );
}