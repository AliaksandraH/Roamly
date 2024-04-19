import { useState } from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";
import UserAvatar from "react-native-user-avatar";
import styles from "./styles";

const Reviews = ({ reviews }) => {
    const { review, information, authorName, container, lable } = styles;
    const [rating, setRating] = useState(0);

    const reviewsInit = reviews.map(({ author_name, time, rating, text }) => {
        return (
            <View key={`${author_name}${time}`} style={review}>
                <View style={information}>
                    <UserAvatar
                        size={45}
                        name={author_name}
                        bgColor="#2B77E9"
                    />
                    <StarRating
                        rating={rating}
                        starSize={20}
                        color="#B4C9DB"
                        onChange={setRating}
                    />
                </View>
                <Text style={[authorName]}>{author_name}</Text>
                {text && <Text>{text}</Text>}
            </View>
        );
    });

    return (
        <View style={[container]}>
            <Text style={[lable]}>Reviews:</Text>
            {reviewsInit}
        </View>
    );
};

export default Reviews;
