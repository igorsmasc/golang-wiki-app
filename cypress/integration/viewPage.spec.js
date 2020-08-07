/// <reference types="cypress" />

import { viewPage } from "../support/page_objects/viewPage";

describe("Test view page elements", () => {
  it("verify existing wiki page", () => {
    let wikiTest = "TestWikiPage";
    let wikiContent = "This is a sample wiki Page used in automated tests.";
    viewPage.navigate(wikiTest);
    cy.get("h1").should("contain", wikiTest);
    cy.get("a")
      .should("have.attr", "href", `/edit/${wikiTest}`)
      .should("contain", "edit");
    cy.get("#content").should("contain", wikiContent);
  });

  it.only("verify nonexistent wiki page should redirect to the edit page", () => {
    let wikiTest = "NewTestWikiPage";
    viewPage.navigate(wikiTest);
    cy.get("h1").should("contain", `Editing ${wikiTest}`);
  });
});
