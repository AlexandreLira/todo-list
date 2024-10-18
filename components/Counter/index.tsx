import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

interface CounterProps {
    label: string;
    value: number;
    color?: string;
}

export function Counter(props: CounterProps) {
    const { label, value, color = Colors.blue } = props

    const styles = styling(color)

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.counter}>
                <Text style={styles.counterText}>{value}</Text>
            </View>
        </View>
    )
}

const styling = (color: string) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    label: {
        color: color,
        fontFamily: Fonts.bold,
        fontSize: 14
    },
    counter: {
        fontFamily: Fonts.bold,
        backgroundColor: Colors.gray_400,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
    },
    counterText: {
        color: Colors.gray_200,
        fontWeight: 'bold',
        fontSize: 12
    }
})