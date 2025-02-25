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
      headers: {
        authorization: `Bearer ${Cypress.env("userToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.not.null;
      expect(response.body).to.be.an("object");
      expect(response.body.message).to.eq("Não autorizado");
    });
  });
});
