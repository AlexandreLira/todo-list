import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import Logo from '@/assets/images/logo.png';
import Feather from '@expo/vector-icons/Feather';
import { Counter } from "@/components/Counter";
import { Colors } from "@/constants/Colors";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function Home() {

    const animation = useSharedValue(0)

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    const styleAnimdated = useAnimatedStyle(() => ({
        borderColor: interpolateColor(animation.value, [0, 100], [Colors.gray_700, Colors.purple_dark])
    }))

    function onFocus() {
        animation.value = withTiming(100)
    }

    function onBlur() {
        animation.value = withTiming(0)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} style={{ width: 110 }} />
            </View>

            <View style={styles.inputContent}>
                <AnimatedTextInput
                    placeholder="Adicione uma nova tarefa"
                    style={[styles.input, styleAnimdated]}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholderTextColor="#808080"
                />
                <TouchableOpacity style={styles.button}>
                    <Feather name="plus-circle" size={18} color="white" />
                </TouchableOpacity>

            </View>

            <View style={styles.counterWrapper}>
                <Counter label="Criadas" value={0} />
                <Counter label="Concluídas" value={0} color={Colors.purple} />
            </View>
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray_600
    },

    header: {
        height: 173,
        backgroundColor: Colors.gray_700,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContent: {
        paddingHorizontal: 24,
        marginTop: -24,
        flexDirection: 'row',
        gap: 4
    },
    input: {
        backgroundColor: Colors.gray_500,
        height: 54,
        padding: 16,
        borderRadius: 6,
        borderWidth: 1,
        color: Colors.gray_100,
        flex: 1,
    },
    button: {
        backgroundColor: '#1E6F9F',
        borderRadius: 6,
        height: 52,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterWrapper: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})