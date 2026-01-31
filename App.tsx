import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/Home.tsx";
import TodayScreen from "./src/screens/Today.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RecipeScreen from "./src/screens/Recipe.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Today" component={TodayScreen} />
              <Stack.Screen name="Recipe" component={RecipeScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}