import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from "@/pages/logIn/logIn";
import Registration from "@/pages/registration/registration";
import Main from "@/pages/main/main";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="Home" component={Main} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigator;
