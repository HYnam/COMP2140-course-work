import React, {
    useState
} from "react";

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Dimensions,
    Text,
    Button,
    StyleSheet,
    TextInput,
} from "react-native";

import {
    launchImageLibrary,
} from "react-native-image-picker";

import { colors } from "../data/theme";

const {
    width,
    height
} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    photoFullView: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.dark.fgColor,
        borderStyle: "solid",
        height: height / 2,
        marginBottom: 20
    },
    photoEmptyView: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.dark.fgColor,
        borderStyle: "dashed",
        height: height / 2,
        marginBottom: 20
    },
    photoFullImage: {
        width: "100%",
        borderRadius: 10
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: 400,
    },
    buttonViewAdded: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center", 
        flexDirection: "row",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        placeholderTextColor: colors.dark.bgColor,
        backgroundColor: colors.dark.fgColor,
        textAlign: "center"
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.purpleColorLighter
    },
    textPar: {
        fontSize: 20, 
        color: colors.purpleColorLighter
    }
});

export default function Profile() {

    const [ photoState, setPhotoState ] = useState({});
    console.log(photoState);

    const [text, onChangeText] = React.useState("Enter Your Name")
    
    async function handleChangePress() {
        const result = await launchImageLibrary();
        if(typeof result.assets[0] == "object") {
            setPhotoState(result.assets[0]);
        }
    }
    
    async function handleRemovePress() {
        setPhotoState({});
    }
    
    const hasPhoto = typeof photoState.uri != "undefined";
    
    function Photo(props) {
        if(hasPhoto) {
            return (
                <View style={styles.photoFullView}>
                    <Image
                        style={styles.photoFullImage}
                        resizeMode="cover"
                        source={{
                            uri: photoState.uri,
                            width: width,
                            height: height / 2
                        }}
                    />

                    <View style={styles.buttonViewAdded}>
                        <Button
                            onPress={handleChangePress}
                            title={hasPhoto ? "Change Photo" : "Add Photo"}
                        />
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.photoEmptyView}> 
                    <View style={styles.buttonView}>
                        <Button
                            onPress={handleChangePress}
                            title={hasPhoto ? "Change Photo" : "Add Photo"}
                        />
                    </View>
                </View>
            );        
        }
    }
    
    return (
        <SafeAreaView>
            <Text style={styles.textHeader}>
                Edit Profile
            </Text>
            <Text style={styles.textPar}>
                Mirror, Mirror On The Wall...
            </Text>

            <View style={styles.container}>
                <Photo />
                <TextInput
                    style={styles.input}
                    onChange={onChangeText}
                    value={text}
                />
            </View>
        </SafeAreaView>
    );

}