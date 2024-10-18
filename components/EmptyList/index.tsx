import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import clipboard from '@/assets/images/clipboard.png'
import { Fonts } from "@/constants/Fonts";
export function EmptyList() {
    return (
        <View style={styles.container}>
            <Image source={clipboard} />
            <View style={styles.content}>
                <Text style={styles.title}>
                    Você ainda não tem tarefas cadastradas
                </Text>
                <Text style={styles.label}>
                    Crie tarefas e organize seus itens a fazer
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.gray_400,
        paddingVertical: 48,
        gap: 16
    },
    content: {
        gap: 6,
        alignItems: "center"
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.gray_300
    },
    label: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: Colors.gray_300
    }

})