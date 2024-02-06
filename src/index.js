import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

window.renderQuiz = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.render(<App />, container);
  }
};
