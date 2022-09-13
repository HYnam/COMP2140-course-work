import Template from "../components/Template";
import { synth, guitar, toneObject } from "../data/instruments.js";
import { useState } from "react";

function Bar({ barID, barEnable, handleBarClick }) {
    function barSelected() {
        if (barEnable) {
            return "selected";
        }
        return "";
    }

    return (
        <div className={`bar bar-${barID} ${barSelected()}`} onClick={handleBarClick}>
            {barID}
        </div>
    );
}

function Bars({ sequence, setSequence, toneObject }) {
    function sortSequence(bar, otherBar) {
        if (bar.barID < otherBar.barID) {
            return -1;
        }
        if (bar.barID > otherBar.barID) {
            return 1;
        }
        return 0;
    }

    function handleBarClick(bar) {
        const now = toneObject.now();
        guitar.triggerAttackRelease("C3", "8n", now);
        let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
        setSequence([ ...filteredSequence, {...bar, barEnable: !bar.barEnable } ]);
    }
    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);
}

function Sequencer({ toneObject, toneTransport, tonePart }) {
    const initialSequence = [];

    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barEnable: false,
            //barEnable: bar % 2 == 1 ? true: false, //Pre-fill every second bar for testing
        });
    }

    const [sequence, setSequence] = useState(initialSequence);

    return (
        <>
            <div className="sequencer">
                <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
            </div>
        </>
    );
}

export default function Music({ toneObject, toneTransport, tonePart }) {
    function playNotesOne() {
        synth.triggerAttackRelease("G#3", "8n"); // Plays an G# note on 3rd octave
    }

    function playNotesManually() {
        const now = toneObject.now();
        
        synth.triggerAttackRelease("F#3", "8n", now);
        synth.triggerAttackRelease("D#3", "8n", now + 0.5);
        synth.triggerAttackRelease("C#3", "8n", now + 1);
    }

    function playNotesFromArray() { 
        const now = toneObject.now();
        const sequence = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];
        
        sequence.forEach((note, time) => {
            synth.triggerAttackRelease(note, "8n", now + (time / 4));   //Plays 0.25s apart
        });
    }

    return (
        <Template title="Music">
            <h3>Synth Sequencer</h3>
            <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} />
        </Template>
    );
}