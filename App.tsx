import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/Home.tsx";
import TodayScreen from "./src/screens/Today.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RecipeScreen from "./src/screens/Recipe.tsx";
import SettingsScreen from "./src/screens/Info.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import { AppState, type AppStateStatus } from "react-native";
import "./src/i18n";
import i18n from "i18next";

const STORAGE_KEY = 'app:progress';

// Default progress structure
const today = new Date().toISOString().slice(0, 10);

const DEFAULT_PROGRESS = {
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
    ,
    extras: {
        active: true,
        dailyTarget: 1,
        todayCount: 0,
        total: 0,
        pdfUri: null,
        startPage: 1
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

    const today = new Date().toISOString().slice(0, 10);


    progress.quran = progress.quran ?? { total: 0, todayCount: 0 };
    progress.jawshan = progress.jawshan ?? { total: 0, todayCount: 0 };
    progress.salawat = progress.salawat ?? { todayCount: 0, doneToday: false };
    progress.memorization = progress.memorization ?? { total: 0, todayCount: 0 };
    progress.dhikr = progress.dhikr ?? { todayCount: 0, dailyTarget: 0 };
    progress.extras = progress.extras ?? { total: 0, todayCount: 0 };



    if (progress.lastResetDate === today) return;

    // Reset daily counts
    progress.quran.todayCount = 0;

    const jawshanTotal = Number(progress.jawshan.total ?? 0);
    const jawshanToday = Number(progress.jawshan.todayCount ?? 0);
    progress.jawshan.total = jawshanTotal + jawshanToday;
    progress.jawshan.todayCount = 0;

    if (Number(progress.dhikr.todayCount) >= Number(progress.dhikr.dailyTarget)) {
        progress.dhikr.todayCount = 0;
    }

    progress.salawat.doneToday = false;
    progress.salawat.todayCount = 0;

    progress.memorization.todayCount = 0;

    progress.lastResetDate = today;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}




const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        let currentState: AppStateStatus = AppState.currentState;

        const init = async () => {
            const lang = await AsyncStorage.getItem("app:lang");
            if (lang) {
                await i18n.changeLanguage(lang);
            }

            await initProgressStorage();
            await checkDailyReset();
        };

        void init();

        const sub = AppState.addEventListener("change", (nextState) => {
            const wasBackground = currentState === "inactive" || currentState === "background";
            const isActive = nextState === "active";

            if (wasBackground && isActive) {
                void checkDailyReset();
            }

            currentState = nextState;
        });

        return () => sub.remove();
    }, []);




    return (
      <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Today" component={TodayScreen} />
              <Stack.Screen name="Recipe" component={RecipeScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />

          </Stack.Navigator>

      </NavigationContainer>

      </GestureHandlerRootView>
  );
}