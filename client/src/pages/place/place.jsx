import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    Pressable,
    TouchableOpacity,
    SafeAreaView,
    Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "react-native-star-rating-widget";
import Carousel from "react-native-snap-carousel";
import {
    changeModal,
    addPlacesToVisit,
    deletePlacesToVisit,
    addPlacesVisited,
    deletePlacesVisited,
} from "@/actions";
import { useHttp } from "@/hooks/http.hook";
import Reviews from "@/components/reviews/reviews";
import OpenLink from "@/components/openLink/openLink";
import PhoneNumber from "@/components/phoneNumber/phoneNumber";
import CarouselCardItem from "@/components/carouselCardItem/carouselCardItem";
import Spinner from "@/components/spinner/spinner";
import { databases } from "@/helpers/constants";
import modalStyles from "@/styles/modal";
import styles from "./styles";
import main from "@/styles/main";

const Place = () => {
    const { request } = useHttp();
    const isCarousel = React.useRef(null);
    const dispatch = useDispatch();
    const { modals, placeInformation, user, placesToVisit, placesVisited } =
        useSelector((state) => state);
    const iconStar1 = require("./img/icons8-star-50.png");
    const iconStar2 = require("./img/icons8-star-50-2.png");
    const iconSurprise1 = require("./img/icons8-surprise-50.png");
    const iconSurprise2 = require("./img/icons8-surprise-50-2.png");
    const [visitedIcon, setVisitedIcon] = useState(iconSurprise1);
    const [toVisitIcon, setToVisitIcon] = useState(iconStar1);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const {
        textTime,
        scroll,
        icons,
        icon,
        containerIcon,
        borderLeft,
        image,
        containerRating,
        textName,
        text,
        containerTime,
        lableTime,
        time,
        containerCloseModal,
    } = styles;
    const { width100, fontSize16, flexRow, fontSize18 } = main;
    const { modal } = modalStyles;

    useEffect(() => {
        if (placeInformation) {
            getTypesPlace(placeInformation.id);
        }
    }, [placeInformation]);

    const isPlaceToVisit = (id) => placesToVisit.find((obj) => obj.id === id);
    const isPlaceVisited = (id) => placesVisited.find((obj) => obj.id === id);

    const updateIcons = (id) => {
        setToVisitIcon(isPlaceToVisit(id) ? iconStar2 : iconStar1);
        setVisitedIcon(isPlaceVisited(id) ? iconSurprise2 : iconSurprise1);
    };

    const getTypesPlace = (id) => {
        updateIcons(id);
    };

    const addNotOwnMarker = (isToVisit) => {
        isToVisit
            ? manageMarkersDB(
                  "markersToVisit",
                  addPlacesToVisit,
                  setToVisitIcon,
                  iconStar2
              )
            : manageMarkersDB(
                  "markersVisited",
                  addPlacesVisited,
                  setVisitedIcon,
                  iconSurprise2
              );
    };

    const deleteNotOwnMarker = (isToVisit) => {
        isToVisit
            ? manageMarkersDB(
                  "markersToVisit",
                  deletePlacesToVisit,
                  setToVisitIcon,
                  iconStar1
              )
            : manageMarkersDB(
                  "markersVisited",
                  deletePlacesVisited,
                  setVisitedIcon,
                  iconSurprise1
              );
    };

    const manageOwnMarker = (isToVisit, condition) => {
        condition
            ? addOwnMarkersDB(
                  isToVisit ? addPlacesToVisit : addPlacesVisited,
                  isToVisit ? setToVisitIcon : setVisitedIcon,
                  isToVisit ? iconStar2 : iconSurprise2,
                  isToVisit ? "markersToVisit" : "markersVisited"
              )
            : deleteOwnMarkersDB(
                  isToVisit ? deletePlacesToVisit : deletePlacesVisited,
                  isToVisit ? setToVisitIcon : setVisitedIcon,
                  isToVisit ? iconStar1 : iconSurprise1,
                  isToVisit ? "markersToVisit" : "markersVisited"
              );
    };

    const manageMarker = (isToVisit) => {
        const condition = isToVisit
            ? toVisitIcon === iconStar1
            : visitedIcon === iconSurprise1;
        if (placeInformation.own) {
            return manageOwnMarker(isToVisit, condition);
        }
        return condition
            ? addNotOwnMarker(isToVisit)
            : deleteNotOwnMarker(isToVisit);
    };

    async function manageMarkersDB(typeMarker, database, typeImg, img) {
        setLoading(true);
        try {
            await request(
                `${databases.addOrDeleteMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    markerId: placeInformation.id,
                    typeMarker,
                })
            );
            typeImg(img);
            dispatch(database(placeInformation));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function addOwnMarkersDB(database, type, img, tekst) {
        setLoading(true);
        try {
            const data = await request(
                `${databases.getOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    markerId: placeInformation.id,
                })
            );
            const marker = { ...data, id: data._id };
            await request(
                `${databases.changeOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    id: placeInformation.id,
                    type: [...data.type, tekst],
                })
            );
            type(img);
            dispatch(database(marker));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function deleteOwnMarkersDB(database, type, img, tekst) {
        setLoading(true);
        try {
            const data = await request(
                `${databases.getOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    markerId: placeInformation.id,
                })
            );
            const marker = { ...data, id: data._id };
            const arr = data.type.filter((i) => i !== tekst);
            await request(
                `${databases.changeOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    id: placeInformation.id,
                    type: arr,
                })
            );
            type(img);
            dispatch(database(marker));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const getOpeningHours = (array) => {
        return array.map((el, i) => {
            return (
                <Text key={i} style={[textTime, width100, fontSize16]}>
                    {el}
                </Text>
            );
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modals === "place"}
            onRequestClose={() => {
                dispatch(changeModal("default"));
            }}
            statusBarTranslucent={false}
        >
            <Spinner loading={loading} />
            <SafeAreaView style={[{ flex: 1 }, modal]}>
                <ScrollView style={scroll}>
                    <View style={[icons, width100, flexRow]}>
                        <TouchableOpacity
                            style={containerIcon}
                            onPress={() => manageMarker(false)}
                        >
                            <Image style={icon} source={visitedIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={containerIcon}
                            onPress={() => manageMarker(true)}
                        >
                            <Image style={icon} source={toVisitIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[containerIcon, borderLeft]}
                            onPress={() => dispatch(changeModal("default"))}
                        >
                            <Image
                                style={icon}
                                source={require("./img/icons8-place-marker-50.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    {placeInformation.photo &&
                    placeInformation.photo.length > 0 ? (
                        <View style={[image, width100]}>
                            <Carousel
                                layout="tinder"
                                layoutCardOffset={9}
                                ref={isCarousel}
                                data={placeInformation.photo}
                                renderItem={CarouselCardItem}
                                sliderWidth={300}
                                itemWidth={300}
                                inactiveSlideShift={0}
                                useScrollView={true}
                            />
                        </View>
                    ) : (
                        <Image
                            style={[image, width100]}
                            source={require("./img/image_not_found.png")}
                        />
                    )}
                    {placeInformation.rating && (
                        <View style={[containerRating, flexRow, width100]}>
                            <StarRating
                                rating={placeInformation.rating}
                                starSize={30}
                                color="#B4C9DB"
                                onChange={setRating}
                            />
                        </View>
                    )}
                    {placeInformation.name && (
                        <Text style={[textName, width100, fontSize18]}>
                            {placeInformation.name}
                        </Text>
                    )}
                    {placeInformation.address && (
                        <Text style={[text, width100, fontSize16]}>
                            {placeInformation.address}
                        </Text>
                    )}
                    {placeInformation.location && (
                        <Text style={[text, width100, fontSize16]}>
                            Latitude: {placeInformation.location.latitude},
                            Longitude: {placeInformation.location.longitude}
                        </Text>
                    )}
                    {placeInformation.website && (
                        <OpenLink url={placeInformation.website} />
                    )}
                    {placeInformation.phone && (
                        <PhoneNumber phoneNumber={placeInformation.phone} />
                    )}
                    {placeInformation.opening_hours &&
                        placeInformation.opening_hours.length > 0 && (
                            <View style={[containerTime, width100]}>
                                <Text style={[lableTime, width100, fontSize18]}>
                                    Opening hours:
                                </Text>
                                <View style={[time, width100]}>
                                    {getOpeningHours(
                                        placeInformation.opening_hours
                                    )}
                                </View>
                            </View>
                        )}
                    {placeInformation.reviews &&
                    placeInformation.reviews.length > 0 ? (
                        <Reviews reviews={placeInformation.reviews} />
                    ) : null}
                </ScrollView>
                <Pressable
                    style={containerCloseModal}
                    onPress={() => dispatch(changeModal("default"))}
                />
            </SafeAreaView>
        </Modal>
    );
};

export default Place;
