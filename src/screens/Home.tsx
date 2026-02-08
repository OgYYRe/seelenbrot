import {Pressable, Text, View} from "react-native";


export default function HomeScreen({navigation}:  any ) {

    return (
        <View>
            <View style={{ borderWidth: 5, borderColor: "#ccc", padding: 10, marginBottom: 10 }}>
                <Text style={{ textAlign: "center", writingDirection: "rtl", fontSize:24 }}>اَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُۜ</Text>

                <Text style={{ fontStyle:'italic', fontWeight:'bold',textAlign: "center", fontSize:16}}>..., Kalpler, ancak Allah’ı anmakla huzur bulur.</Text>
                <Text style={{fontStyle:'normal', textAlign:'center', fontSize:14 }}>..., Die Herzen werden nur durch die Erwähnung Allahs ruhig.</Text>
            </View>



            <View style={{borderWidth: 1, borderColor: '#ccc'}}>
                <Pressable onPress={()=> navigation.navigate('Recipe')}>
                    <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>Malzemeleri ayarla</Text>
                </Pressable>
            </View>


            <View style={{borderWidth: 1, borderColor: '#ccc'}}>
            <Pressable onPress={()=> navigation.navigate('Today')}>
                <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>Yemek Vakti</Text>
            </Pressable>
            </View>

            <View style={{borderWidth: 1, borderColor: '#ccc'}}>
                <Pressable onPress={()=> navigation.navigate('Debug')}>
                    <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>Debug Ekrani</Text>
                </Pressable>
            </View>


            <View style={{ borderWidth: 1, borderColor: '#ccc' }}>

            <Pressable onPress={()=> navigation.navigate('Settings')}>
                    <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>Ayarlar</Text>
                </Pressable>
            </View>



        </View>
    );
}