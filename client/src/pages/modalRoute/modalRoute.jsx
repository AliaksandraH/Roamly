import React, { useState, useEffect } from "react";
import {
    Modal,
    Text,
    ScrollView,
    Pressable,
    SafeAreaView,
    View,
    Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeModal, numRoutePlus, numRouteMinus } from "@/actions";
import modalStyles from "@/styles/modal";
import styles from "./styles";
import main from "@/styles/main";

const ModalRoute = () => {
    const { modals, route, numRoute } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { modal, containerModal, textHelper, containerCloseModal } =
        modalStyles;
    const { containerLabelButtons, label, img, containerItemRoute, textBold } =
        styles;
    const { fontSize18 } = main;

    const [showButtonFB, setShowButtonFB] = useState(false);

    useEffect(() => {
        if (route.length > 1) {
            setShowButtonFB(true);
        } else {
            setShowButtonFB(false);
        }
    }, [route]);

    const onChangeNumRoutePlus = () => {
        if (route.length > 1 && route.length != numRoute + 1)
            dispatch(numRoutePlus());
    };

    const onChangeNumRouteMinus = () => {
        if (numRoute - 1 >= 0) dispatch(numRouteMinus());
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modals === "route"}
            onRequestClose={() => {
                dispatch(changeModal("default"));
            }}
            statusBarTranslucent={false}
        >
            <SafeAreaView style={[{ flex: 1 }, modal]}>
                <ScrollView style={containerModal}>
                    <View style={containerLabelButtons}>
                        <Text style={label}>Route:</Text>
                        {showButtonFB && (
                            <>
                                <Pressable
                                    onPress={() => onChangeNumRouteMinus()}
                                >
                                    <Image
                                        style={img}
                                        source={require("./img/icons8-arrow-left-100.png")}
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={() => onChangeNumRoutePlus()}
                                >
                                    <Image
                                        style={img}
                                        source={require("./img/icons8-right-100.png")}
                                    />
                                </Pressable>
                                <Text style={label}>{numRoute + 1} day</Text>
                            </>
                        )}
                    </View>

                    {route[0] && route[0].length < 1 && (
                        <Text style={textHelper}>
                            You haven't built a route.
                        </Text>
                    )}
                    {route[numRoute].map((item, index) => (
                        <View key={index} style={containerItemRoute}>
                            {route[numRoute].length != index + 1 ? (
                                <Image
                                    style={img}
                                    source={require("./img/icons8-advance-100.png")}
                                />
                            ) : (
                                <Image
                                    style={img}
                                    source={require("./img/icons8-t-100.png")}
                                />
                            )}
                            {route[numRoute].length != index + 1 &&
                            index != 0 ? (
                                <Text style={fontSize18}>{item.name}</Text>
                            ) : (
                                <Text style={textBold}>{item.name}</Text>
                            )}
                        </View>
                    ))}
                </ScrollView>
                <Pressable
                    style={containerCloseModal}
                    onPress={() => dispatch(changeModal("default"))}
                />
            </SafeAreaView>
        </Modal>
    );
};

export default ModalRoute;
