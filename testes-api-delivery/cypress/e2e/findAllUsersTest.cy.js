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

describe("Teste da rota de retornar todos os usuários", () => {
  it("Deve retornar todos os usuários com sucesso", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/",
      headers: {
        authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("array");
    });
  });

  it("Deve retornar não autorizado quando o usuário não tiver autorização", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Acesso negado");
    });
  });

  it("Deve retornar token inválido quando o token for inválido", () => {
    cy.request({
      method: "GET",
      url: "/usuarios/",
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
});
