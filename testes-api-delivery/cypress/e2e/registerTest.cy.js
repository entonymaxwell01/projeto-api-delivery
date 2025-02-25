import { faker } from "@faker-js/faker";

describe("Teste da rota de registro de usuário", () => {
  it("Deve realizar o cadastro com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/auth/register",
      body: {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        cpf: faker.number.int(),
        password: faker.internet.password(),
      },
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(201);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.token).to.be.not.null;
    });
  });
  it("Deve retornar erro de campos obrigatórios não preenchidos", () => {
    cy.request({
      method: "POST",
      url: "/auth/register",
      body: {
        nome: "",
        email: faker.internet.email(),
        cpf: faker.number.int(),
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(400);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Campos obrigatórios não preenchidos");
    });
  });
  it.only("Deve retornar erro de usuário já cadastrado", () => {
    cy.request({
      method: "POST",
      url: "/auth/register",
      body: {
        nome: faker.person.firstName(),
        email: `${Cypress.env("userEmail")}`,
        cpf: faker.number.int(),
        password: `${Cypress.env("userPassword")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.be.not.null;
      expect(response.body.error).to.eq("Usuário já cadastrado");
    });
  });
});
