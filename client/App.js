import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/store";
import StackNavigator from "./src/stackNavigator/stackNavigator";

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
