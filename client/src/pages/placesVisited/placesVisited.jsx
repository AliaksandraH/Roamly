import React from "react";
import { Modal, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeModal, setPlaceInformation } from "@/actions";
import PlaceInit from "@/components/placeInit/placeInit";
import modalStyles from "@/styles/modal";

const PlacesVisited = () => {
    const { modals, placesVisited } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { modal, containerModal, lable, textHelper, containerCloseModal } =
        modalStyles;

    const getOwnPlace = async (data, id) => {
        dispatch(setPlaceInformation(data.find((obj) => obj.id === id)));
        dispatch(changeModal("place"));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modals === "visited"}
            onRequestClose={() => {
                dispatch(changeModal("default"));
            }}
            statusBarTranslucent={false}
        >
            <SafeAreaView style={[{ flex: 1 }, modal]}>
                <ScrollView style={containerModal}>
                    <Text style={lable}>Places that have been visited:</Text>
                    {placesVisited && placesVisited.length < 1 && (
                        <Text style={textHelper}>
                            You don't have any saved places visited.
                        </Text>
                    )}
                    {placesVisited &&
                        placesVisited.map((place) => (
                            <Pressable
                                key={place.id}
                                onPress={() => {
                                    getOwnPlace(placesVisited, place.id);
                                }}
                            >
                                <PlaceInit place={place} />
                            </Pressable>
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

export default PlacesVisited;
