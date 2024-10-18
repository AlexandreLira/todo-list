import { Colors } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fonts } from "@/constants/Fonts";

interface ItemCardProps {
    title: string;
    checked?: boolean;
    onValueChange?: ((value: boolean) => void) | undefined
    onRemove?: () => void
}

export function ItemCard(props: ItemCardProps) {
    const {
        title,
        checked = false,
        onValueChange,
        onRemove
    } = props

    const styles = styling(checked)

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={checked}
                onValueChange={onValueChange}
                color={checked ? Colors.purple_dark : Colors.blue}
            />
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={onRemove}>
                <FontAwesome name="trash-o" size={18} color={Colors.gray_300} />
            </TouchableOpacity>
        </View>
    )
}

const styling = (checked: boolean) => StyleSheet.create({
    container: {
        backgroundColor: Colors.gray_500,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        minHeight: 64,
        borderWidth: checked ? 0 : 1,
        borderColor: Colors.gray_400,
        borderRadius: 8,
        gap: 8,

    },
    title: {
        fontFamily: Fonts.regular,
        flex: 1,
        fontWeight: 'regular',
        fontSize: 14,
        flexShrink: 1,
        color: checked ? Colors.gray_300 : Colors.gray_100,
        textDecorationLine: checked ? 'line-through' : 'none',
    },
    checkbox: {
        borderRadius: 999,
    },
})