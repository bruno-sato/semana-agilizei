const Chance = require('chance');
const chance = new Chance();

context('Cadastro', () => {
  it('Cadastro de usuário no site', () => {
    // rotas
    // POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    cy.server();
    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
      .as('postNewtable');
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
      .as('postUsertable');
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
      .as('getNewtable');

    // acessa pagina
    cy.visit('Register.html');

    // type
    cy.get('input[ng-model="FirstName"]').type(chance.first());
    cy.get('input[ng-model="LastName"]').type(chance.last());
    cy.get('input[ng-model="EmailAdress"]').type(chance.email());
    cy.get('input[ng-model="Phone"]').type(chance.phone({formatted: false}));

    // check
    cy.get('input[value="FeMale"]').check();
    cy.get('input[type="checkbox"]').check("Cricket");
    cy.get('input[type="checkbox"]').check("Hockey");

    // select
    cy.get('select#Skills').select('Android');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('Japan', {force: true});
    cy.get('select[ng-model="yearbox"]').select('1960');
    cy.get('select[ng-model="monthbox"]').select('April');
    cy.get('select[ng-model="daybox"]').select('15');

    // type
    cy.get('input#firstpassword').type('@giliZei2020');
    cy.get('input#secondpassword').type('@giliZei2020');

    // file
    cy.get('input#imagesrc').attachFile('foto.png');
    cy.get('button#submitbtn').click();

    cy.wait('@postNewtable').then((xhrResponse) => {
      // chai
      expect(xhrResponse.status).to.eq(200);
    });
    cy.wait('@postUsertable').then((xhrResponse) => {
      expect(xhrResponse.status).to.eq(200);
    });
    cy.wait('@getNewtable').then((xhrResponse) => {
      expect(xhrResponse.status).to.eq(200);
    });
    cy.url().should('contain', 'WebTable');
  });
});