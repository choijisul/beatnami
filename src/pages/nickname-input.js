import ReactDOM from 'react-dom/client'
import exampleImage from './assets/img/MainBackground.png';
// import './nickname-input.css'
const root = ReactDOM.createRoot(document.getElementById("root"))

const background = function() {
  return (
    <div>
      <img src={exampleImage} className='background' />
    </div>
  );
}

root.render(
    <div>
        {background}
    </div>
);
