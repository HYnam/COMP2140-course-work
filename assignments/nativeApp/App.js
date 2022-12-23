import React, { useState, useEffect } from "react";

import Tabs from "./components/Tabs";


    const [newLocation, setLocation] = useState(null);
    const getLocation = async () => {
        try {
            const response = await fetch (
                'http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=locations'
            );
            let responseJson = await response.json(); 
            setLocation(responseJson.locations);
            return responseJson.locations
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLocation();
    }, []);
    export const locations = newLocation;
    console.log(newLocation);


export default function App() {
    return (
        newLocation !== null ? 
            <Tabs />  
        : null 
    );
}