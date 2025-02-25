describe("Teste da rota de login", () => {
  it("Deve realizar login com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: `${Cypress.env("userEmail")}`,
        password: `${Cypress.env("userPassword")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.token).to.be.not.null;
    });
  });
  it.only("Deve retornar erro de usuário não encontrado", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: "invalid@mail",
        password: "invalidpassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.error).to.eq("Usuário não encontrado");
    });
  });
});
