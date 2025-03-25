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

describe("Testes da rota de excluir usuário", () => {
  it.only("Deve excluir um usuário com sucesso", () => {
    cy.request({
      method: "DELETE",
      url: "/usuarios/delete/25",
      headers: {
        authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.message).to.eq("Usuário deletado com sucesso");
      expect(response.body.userDeleted).to.be.not.null;
      expect(response.body.userDeleted).to.be.an("object");
    });
  });
  it("Deve retornar erro de usuário não encontrado", () => {
    cy.request({
      method: "DELETE",
      url: "/usuarios/delete/999",
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

  it("Deve retornar token inválido ao tentar excluir um usuário com token inválido", () => {
    cy.request({
      method: "DELETE",
      url: "/usuarios/delete/999",
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNDcyOTczLCJleHAiOjE3NDE0NzY1NzN9.jTBqq6HXAJ9zqu4bm80qq7n6m__KR8lFZ744Zz75bj4",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Token inválido");
    });
  });

  it("Deve retornar acesso negado ao tentar excluir um usuário sem autorização", () => {
    cy.request({
      method: "DELETE",
      url: "/usuarios/delete/999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Acesso negado");
    });
  });
});
