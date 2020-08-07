export class ViewPage {
  navigate(page) {
    cy.visit("/view/" + page);
  }
}

export const viewPage = new ViewPage();
