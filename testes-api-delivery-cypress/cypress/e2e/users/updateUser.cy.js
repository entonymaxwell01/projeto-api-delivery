import { faker } from "@faker-js/faker";
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

describe("Testes da rota de update", () => {
  it("Deve atualizar os dados de um usuário com sucesso", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/3",
      body: {
        nome: "Usuário de testes",
        email: "test@test2.com",
        cpf: "12345678920",
      },
      headers: {
        Authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.message).to.eq("Usuário atualizado com sucesso");
      expect(response.body.userUpdate.data.nome).to.be.eq("Usuário de testes");
    });
  });

  it("Deve retornar erro ao não preencher campos obrigatórios", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/5",
      body: {
        nome: "",
        email: "example10@test.com",
        cpf: "12891281201",
      },
      headers: {
        Authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Campos obrigatórios não preenchidos");
    });
  });

  it("Deve retornar erro ao não encontrar usuário", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/1000",
      body: {
        nome: "Usuário de testes",
        email: "example10@test.com",
        cpf: "12891281201",
      },
      headers: {
        Authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Usuário não encontrado");
    });
  });
  it("Deve retornar erro ao não CPF ou EMAIL já estarem sendo utilizados por outro usuário", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/3",
      body: {
        nome: "Usuário de testes",
        email: `${Cypress.env("adminEmail")}`,
        cpf: "12345678910",
      },
      headers: {
        Authorization: `Bearer ${Cypress.env("adminToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq(
        "E-mail ou CPF já estão em uso por outro usuário"
      );
    });
  });

  it("Deve retornar erro ao passar um token inexistente", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/13",
      body: {
        nome: "Usuário de testes",
        email: "example10@test.com",
        cpf: "12345678910",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Acesso negado");
    });
  });
  it("Deve retornar erro ao passar um token inválido", () => {
    cy.request({
      method: "PUT",
      url: "/usuarios/update/13",
      body: {
        nome: "Usuário de testes",
        email: "example10@test.com",
        cpf: "12345678910",
      },
      headers: {
        Authorization: `tokeninvalido`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Token inválido");
    });
  });
});
