/**
 * Web entry — runs the React Native app in the browser via react-native-web.
 */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import iconFont from '@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf';
import App from './App';

const iconStyle = document.createElement('style');
iconStyle.textContent = `
  @font-face {
    font-family: 'MaterialDesignIcons';
    src: url(${JSON.stringify(iconFont)}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
document.head.appendChild(iconStyle);

const root = document.getElementById('root');
createRoot(root).render(createElement(App));
