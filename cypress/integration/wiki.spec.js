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

  it("verify nonexistent wiki page should redirect to the edit page", () => {
    let wikiTest = "NewTestWikiPage";
    viewPage.navigate(wikiTest);
    cy.get("h1").should("contain", `Editing ${wikiTest}`);
  });
});

describe("Test save and display new wikis", () => {
  it.only("create a new wiki and save it", () => {
    let wiki = "JustTestWiki";
    let wikiContent = "Delete this wiki after test";
    //verify if this wiki doesn't exists
    viewPage.navigate(wiki);
    //wiki is redirected to edit if it doesn't exist
    cy.get("h1").should("contain", `Editing ${wiki}`);
    //add wiki
    cy.get("form").then((form) => {
      cy.wrap(form).find("textarea").type(wikiContent);
      cy.wrap(form).submit();
    });

    //after form submit, the page should be redirected to the view page
    cy.get("h1").should("contain", wiki);
    cy.get("#content").should("contain", wikiContent);

    //clean up wiki and redirect to home
    cy.contains("a", "delete").click();

    cy.get("h1").should("contain", "Golang Wiki");

    //verify if wiki was removed accessing the wiki view page
    //should go to the edit/new page

    viewPage.navigate(wiki);
    cy.get("h1").should("contain", `Editing ${wiki}`);
  });
});
