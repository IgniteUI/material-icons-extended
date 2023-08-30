import './dist/styles/sprite.css';
import './style.css';
import { youtube } from './src/socialMedia';

document.querySelector('#app').innerHTML = `
    <i class="imx-icon imx-github"></i>
    ${youtube.value}
`;
