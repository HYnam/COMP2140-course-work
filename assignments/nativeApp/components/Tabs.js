import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import ShowMap from "../components/ShowMap";
import PlayMusic from "../screens/MusicPlay";
import Profile from "../screens/Profile";

import icons from "../data/icons";
import { colors, sizes } from "../data/theme";

function TabIcon({ focused, icon }) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                width: 50,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? colors.light.bgColor : colors.purpleColorLighter
                }}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();

function tabOptions(icon) {
    return {
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} />,
        tabBarActiveTintColor: colors.light.bgColor,
        tabBarInactiveTintColor: colors.purpleColorLighter,

        tabBarStyle: {
            height: 70,
            padding: sizes.padding,
            backgroundColor: colors.light.fgColorLighter
        },
        tabBarLabelStyle: {
            padding: sizes.padding / 2
        }
    };
}

function Tabs({ navigation }) {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Map"
                    children={() => <ShowMap navigation={navigation} />}
                    options={() => tabOptions(icons.mapDark)}
                />

                <Tab.Screen
                    name="Music"
                    children={() => <PlayMusic navigation={navigation} />}
                    options={() => tabOptions(icons.logoDark)}
                />

                <Tab.Screen
                    name="Profile"
                    children={() => <Profile navigation={navigation} />}
                    options={() => tabOptions(icons.profileDark)}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );

}

export default Tabs;