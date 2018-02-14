import ReactDOM from 'react-dom';
// import React from 'react';
import app from './app';

const render = async () => {
  const el = await app();
  ReactDOM.hydrate(el, document.getElementById('app'));
};

render();

