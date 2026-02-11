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

// Default progress structure
const DEFAULT_PROGRESS = {
    lastResetDate: "2026-02-05",

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
        total:0
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

async function initProgressStorage() {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (existing == null) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
    }
}

// Reset the Counts and update totals if the day has changed
async function checkDailyReset() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const progress = JSON.parse(raw);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    if (progress.lastResetDate === today) return;

    // Reset daily counts and update totals
    progress.quran.total = (progress.quran.total || 0) + (progress.quran.todayCount || 0);
    progress.quran.todayCount = 0;

    progress.jawshan.total = (progress.jawshan.total || 0) + (progress.jawshan.todayCount || 0);
    progress.jawshan.todayCount = 0;

    progress.salawat.doneToday = false;


    progress.memorization.total = (progress.memorization.total || 0) + (progress.memorization.todayCount || 0);
    progress.memorization.todayCount = 0;

    progress.lastResetDate = today;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}




const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        const init = async () => {
            await initProgressStorage();
            await checkDailyReset();
        };
        init();
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