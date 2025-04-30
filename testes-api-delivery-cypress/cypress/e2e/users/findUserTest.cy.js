before(() => {
  // Login para obter o token de admin
  cy.request({
    method: "POST",
    url: "/auth/login",
    body: {
      email: `${Cypress.env("adminEmail")}`,
      password: `${Cypress.env("adminPassword")}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("adminToken", response.body.token);
  });
});

describe("Testes da rota de buscar um unico usuário", () => {
  it("Deve buscar um usuário com sucesso", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/1",
      headers: {
        authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.id).to.eq(1);
    });
  });

  it("Deve retornar erro de usuário não encontrado", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/999",
      headers: {
        authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Usuário não encontrado");
    });
  });
  it("Deve retornar acesso negado ao buscar um usuário sem token", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Acesso negado");
    });
  });
});
