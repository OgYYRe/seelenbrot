import {useState} from "react";
import {Button, Text, View} from "react-native";


type ZikirProps = {
    target: number;
    name?: string;
};


export default function ZikirCounter({target, name}: ZikirProps) {

    const [count, setCount] = useState(0);
    const done: boolean = count >= target;
    return (


        <View>
            <Text>Tesbih: {count} / {target}</Text>
            <Button
                title={`${name ?? "Zikir"} +1`}
                onPress={() => setCount(count + 1)}
                    disabled={done}
            />
            {done && <Text>Allah kabul etsin</Text>}
            {/*TODO: For future: max 3 Zikir. + Some zikir has explanation*/}
                </View>

    );
}