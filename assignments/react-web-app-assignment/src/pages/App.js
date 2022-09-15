import { Link } from "react-router-dom";
import Template from '../components/Template';

export default function App() {
  return (
    <Template title="Welcome to Share Music App!">
        <p>Create your own <Link to={`/music`}>music sharing list</Link>.</p>
    </Template>
  );
}
