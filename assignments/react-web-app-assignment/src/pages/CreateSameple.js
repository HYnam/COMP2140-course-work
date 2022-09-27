import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Template from "../components/Template";
import { guitar, piano, drums, frenchHorn } from "../data/instruments.js";

function Bar ({ barID, barEnabled, handleBarClick }) {
    function barSelected() {
        if (barEnabled) {
            return true;
        }
        return false;
    }

    return (
        <div className={`bar bar-${barID} ${barSelected()}`} onClick={handleBarClick}></div>
    );
}

function Bars ({ sequence, setSequence, toneObject}) {
    function sortSequence (bar, otherBar) {
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
        setSequence([...filteredSequence, {...bar, barEnabled: !bar.barEnabled }]);
    }
    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);
}

function Preview ({ preview, setPreview, toneObject, toneTransport }) {
    function handlePreviewClick() {
        toneObject.start();
        toneTransport.stop();
        if (preview) {
            setPreview(false);
            console.log("Preview stopped manually");
        } else {
            setPreview(true);
            console.log("Preview started...");
            toneTransport.start();
        }
    }
    return <button onClick={handlePreviewClick}>{preview ? "Stop Previewing" : "Preview"}</button>;
}

function NoteList() {
    const notes = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];    

    return(
        notes.map((note) => (
            <p key={note}>{note}</p>
        ))
    );
}

function Sequencer ({ toneObject, toneTransport, tonePart, notes }) {
    const initialSequence = [];
    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar, 
            barEnabled: false,
        });
    }   
    
    const [sequence, setSequence] = useState(initialSequence);
    const initialPreviewing = false;
    const [preview, setPreview] = useState(initialPreviewing);

    useEffect (() => {
        tonePart.clear();
        toneTransport.cancel();

        sequence.filter(bar => bar.barEnabled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "C3");
        });

        toneTransport.schedule(time => {
            setPreview(false);
            console.log("Preview stopped automatically");
        }, 16/4);
    });

    return (
        <>
            <div className="sequencer">
                <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
            </div>
        </>
    )
}

export default function CreateSample({ toneObject, toneTransport, tonePart }) {
    let sampleName = <input type="text" name="samepleName" placeholder="Enter your music name" />

    return (
        <Template title = "Editing This Sample:">
            <div className="card-detail">
                <div className="card-name">
                    <h2>{sampleName}</h2>
                </div>

                <button>Preview</button>
                <button>Save</button>
            </div>

            <div className="instrument-select">
                <div className="types"><p>Type</p></div>
                <div className="instrument-button"><button>Piano</button></div>
                <div className="instrument-button"><button>French Horn</button></div>
                <div className="instrument-button"><button>Guitar</button></div>
                <div className="instrument-button"><button>Drums</button></div>
            </div>    
            

            <div className="NoteB">
                <div className="text"><NoteList /></div>
                <div className="NoteChoice"><Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} /></div>
            </div>

        </Template>
    )
}