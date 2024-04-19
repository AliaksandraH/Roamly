import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { useHttp } from "@/hooks/http.hook";
import { databases } from "@/helpers/constants";
import signInUpStyles from "@/styles/signInUp";
import Spinner from "@/components/spinner/spinner";
import main from "@/styles/main";

const Registration = () => {
    const { request } = useHttp();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { wh100, width100, fontSize18, fontSize16, flexRow } = main;
    const {
        container,
        transparentBlock,
        registrationContainer,
        label,
        input,
        buttons,
        button,
        textButton,
        borderLeft,
        text,
    } = signInUpStyles;

    const onSave = async () => {
        if (!areAllFieldsFilled()) {
            Alert.alert("You need to fill in all the fields.");
            return;
        }
        if (!checkEmail(email)) {
            Alert.alert("Mail entered incorrectly.");
            return;
        }
        if (!checkPassword(password)) {
            Alert.alert("The password must be longer than 5 characters.");
            return;
        }

        const user = { name, surname, email, password };
        addUser(databases.register, user);
    };

    const areAllFieldsFilled = () => {
        return (
            removingSpaces(name, setName) &&
            removingSpaces(surname, setSurname) &&
            removingSpaces(email, setEmail) &&
            removingSpaces(password, setPassword)
        );
    };
    const addUser = async (url, user) => {
        setLoading(true);
        try {
            const data = await request(url, "POST", JSON.stringify(user));
            if (data.message === "OK") {
                Alert.alert("Registration was successful.");
                navigation.navigate("LogIn");
            } else {
                Alert.alert(data.message);
            }
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const removingSpaces = (str, setStr) => {
        setStr(str.trim());
        return str.trim();
    };

    const checkEmail = (email) => {
        const reg =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email);
    };

    const checkPassword = (pass) => {
        return pass.length > 5;
    };

    return (
        <ImageBackground
            source={require("./img/licensed-image.jpg")}
            resizeMode="cover"
            style={[container, wh100]}
        >
            <Spinner loading={loading} />
            <View style={[transparentBlock, wh100]}></View>
            <View style={[registrationContainer]}>
                <Text style={[label, fontSize18]}>Registration</Text>
                <Text style={[width100, fontSize16, text]}>Name:</Text>
                <TextInput
                    style={input}
                    onChangeText={setName}
                    value={name}
                    placeholder="name"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                />
                <Text style={[width100, fontSize16, text]}>Surname:</Text>
                <TextInput
                    style={input}
                    onChangeText={setSurname}
                    value={surname}
                    placeholder="surname"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                />
                <Text style={[width100, fontSize16, text]}>Email:</Text>
                <TextInput
                    style={input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email"
                    keyboardType="email-address"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                />
                <Text style={[width100, fontSize16, text]}>Password:</Text>
                <TextInput
                    style={input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="password"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                    secureTextEntry
                />
                <View style={[flexRow, buttons, width100]}>
                    <Pressable
                        style={button}
                        onPress={() => navigation.navigate("LogIn")}
                    >
                        <Text style={[textButton, fontSize16]}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={[button, borderLeft]}
                        onPress={() => onSave()}
                    >
                        <Text style={[textButton, fontSize16]}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Registration;
