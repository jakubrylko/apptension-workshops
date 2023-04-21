import { WELCOME_LABEL } from './home.selectors';

export const shouldShowWelcomeLabel = () => cy.contains(WELCOME_LABEL).should('be.visible');
