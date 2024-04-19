import { View, Text } from "react-native";
import Dropdown from "react-native-input-select";
import styles from "./styles";

const Select = ({
    label,
    placeholder,
    data,
    selected,
    changeSelected,
    multiple = false,
}) => {
    const {
        select,
        labelStyle,
        dropdownStyle,
        placeholderStyle,
        modalBackgroundStyle,
        checkboxComponentStyles,
    } = styles;

    return (
        <View style={select}>
            <Text style={labelStyle}>{label}:</Text>
            <Dropdown
                placeholder={placeholder}
                options={data}
                selectedValue={selected}
                onValueChange={(value) => changeSelected(value)}
                primaryColor={"#0166FE"}
                dropdownStyle={dropdownStyle}
                placeholderStyle={placeholderStyle}
                modalBackgroundStyle={modalBackgroundStyle}
                checkboxComponentStyles={checkboxComponentStyles}
                isMultiple={multiple}
            />
        </View>
    );
};

export default Select;
