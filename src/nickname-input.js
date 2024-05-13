import ReactDOM from 'react-dom/client'
import img from "./img/background/MainBackground.png";
import "./css/nickname-input.css";
const root = ReactDOM.createRoot(document.getElementById("root"))

const background = <img src={img} className='background'></img>

root.render(
    <div>
        {background}
    </div>
);

