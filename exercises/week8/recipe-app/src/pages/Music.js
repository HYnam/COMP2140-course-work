import Template from "../components/Template";
import { synth, guitar } from "../data/instruments.js";

export default function Music({ toneObject }) {
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
            <h3>Synth</h3>
            <h4>Play Multiple Notes From Array</h4>
            <p>
                <button onClick={playNotesFromArray}>Preview</button>
            </p>
        </Template>
    );
}