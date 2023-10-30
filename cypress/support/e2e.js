import './commands';
<<<<<<< HEAD
=======
import 'cypress-plugin-api';
>>>>>>> e2e/add-api-tests-for-teamdeck

if (Cypress.config('hideXHRInCommandLog')) {
  const app = window.top;
  if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
}
<<<<<<< HEAD
=======

// Cypress.on('uncaught:exception', (err, runnable) => false);
>>>>>>> e2e/add-api-tests-for-teamdeck
