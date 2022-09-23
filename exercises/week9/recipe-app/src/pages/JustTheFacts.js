import { useState, useEffect } from "react";
import Template from "../components/Template";

function Fact({ fact }) {
    return <p>{fact}</p>;
}

export default function JustTheFacts() {

    const initialFact = "Loading fact...";
    const [fact, setFact] = useState(initialFact);

    useEffect(() => {
        getFact();
    }, []);

    async function getFact() {
        const response = await fetch('https://catfact.ninja/fact');
        const json = await response.json();
        const fact = json.fact;
        setFact(fact);
    }

    return (
        <Template title="Just the Facts">
            <h3>Random Fact</h3>
            <Fact fact={fact} />
        </Template>
    );

}