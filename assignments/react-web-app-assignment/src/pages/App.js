import { Link } from "react-router-dom";
import Template from '../components/Template';
import { useState, useEffect } from "react";

function SampleCard({ sample }) {
  return (
      <h4>{sample}</h4>
  );
}

export default function App() {
  // Read API for sample cards
  const initialCard = "No music, please add one";
  const [sample, setSample] = useState(initialCard);
  
  useEffect(() => {
    getSampleCard();
  }, []);

  async function getSampleCard() {
    const response = await fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples&limit=30&order=asc");
    const json = await response.json();
    const sample = json.sample;
    setSample(sample);
  }

  return (
    <Template title="Samples You've Created">
      <SampleCard sample={sample} />

      <Link to="/create-sample">
        <button>Create Sample</button>
      </Link>
      
    </Template>
  );
}
