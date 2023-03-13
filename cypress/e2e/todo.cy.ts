describe("Todo Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not add todo if input is empty", () => {
    cy.get("input[data-cy=todoInput]").should("have.text", "");
    cy.get("button[data-cy=addTodo]").should("be.disabled");
  });

  it("should able to add a single todo", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();

    cy.get("div[data-cy=todo]").should("exist");
    cy.get("div[data-cy=todo]")
      .find("p")
      .should("have.text", "Clean the floor");
  });

  it("should able to add multiple todos", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();
    cy.get("input[data-cy=todoInput]")
      .clear()
      .type("Wash the dishes")
      .type("{enter}");

    cy.get("div[data-cy=todo]").should("exist").should("have.length", 2);
    cy.get("div[data-cy=todo]")
      .first()
      .find("p")
      .should("have.text", "Clean the floor");
    cy.get("div[data-cy=todo]")
      .last()
      .find("p")
      .should("have.text", "Wash the dishes");
  });

  it("should able to complete todo", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();
    cy.get("div[data-cy=todo]").find("label[data-cy=todoCheck]").click();

    cy.get("div[data-cy=todo]")
      .find("label[data-cy=todoCheck]")
      .find("svg")
      .should("exist");
    cy.get("div[data-cy=todo]").find("p").should("have.class", "completed");

    cy.get("span[data-cy=totalOngoingTodos]").should("have.text", "0");
    cy.get("span[data-cy=totalTodos").should("have.text", "1");
  });

  it("should able to multiple complete todos", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();
    cy.get("input[data-cy=todoInput]")
      .clear()
      .type("Wash the dishes")
      .type("{enter}");

    cy.get("div[data-cy=todo]")
      .first()
      .find("label[data-cy=todoCheck]")
      .click();
    cy.get("div[data-cy=todo]")
      .first()
      .find("label[data-cy=todoCheck]")
      .find("svg")
      .should("exist");
    cy.get("div[data-cy=todo]")
      .first()
      .find("p")
      .should("have.class", "completed");

    cy.get("div[data-cy=todo]").last().find("label[data-cy=todoCheck]").click();
    cy.get("div[data-cy=todo]")
      .last()
      .find("label[data-cy=todoCheck]")
      .find("svg")
      .should("exist");
    cy.get("div[data-cy=todo]")
      .last()
      .find("p")
      .should("have.class", "completed");

    cy.get("span[data-cy=totalOngoingTodos]").should("have.text", "0");
    cy.get("span[data-cy=totalTodos").should("have.text", "2");
  });

  it("should be able to delete a todo", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();

    cy.get("div[data-cy=todo]").find("button[data-cy=deleteTodo]").click();

    cy.get("div[data-cy=todo]").should("not.exist");
    cy.get("span[data-cy=totalTodos").should("have.text", "0");
  });

  it("should be able to delete a todo", () => {
    cy.get("input[data-cy=todoInput]").clear().type("Clean the floor");
    cy.get("button[data-cy=addTodo]").click();

    cy.get("div[data-cy=todo]").find("button[data-cy=deleteTodo]").click();

    cy.get("div[data-cy=todo]").should("not.exist");
    cy.get("span[data-cy=totalTodos").should("have.text", "0");
  });
});
