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

    return (
        <Template title="Music">
            <h3>Synth</h3>
            <h4>Play One Note</h4>
            <p>
                <button onClick={playNotesManually}>Preview</button>
            </p>
        </Template>
    );
}