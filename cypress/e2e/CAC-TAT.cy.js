describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenchendo os campos obrigatório e enviando o formulario', () => {
    cy.get('#firstName').type('Fulanoooooooooooooooooooooo', { delay: 0 })
    cy.get('#lastName').type('deeeeeeeeeeeeeeeeee Tal', { delay: 0 })
    cy.get('#email').type('fulanoooooooooooooo@ciclano.com', { delay: 0 })
    cy.get('textarea').type('Mensagem de teste', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulario com email com formtação invalida', () => {
    cy.get('#firstName').type('Fulanoooooooooooooooooooooo', { delay: 0 })
    cy.get('#lastName').type('deeeeeeeeeeeeeeeeee Tal', { delay: 0 })
    cy.get('#email').type('fulanoooooooooooooo.ciclano.com', { delay: 0 })
    cy.get('textarea').type('Mensagem de teste', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone continuar vazio ao tentar digitar texto', () => {
    cy.get('#phone')
    .type('teste telefone', { delay: 0 })
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Fulanoooooooooooooooooooooo', { delay: 0 })
    cy.get('#lastName').type('deeeeeeeeeeeeeeeeee Tal', { delay: 0 })
    cy.get('#email').type('fulanoooooooooooooo.ciclano.com', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.get('textarea').type('Mensagem de teste', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Fulanoooooooooooooooooooooo', { delay: 0 })
    .should('have.value', 'Fulanoooooooooooooooooooooo')
    cy.get('#lastName')
    .type('deeeeeeeeeeeeeeeeee Tal', { delay: 0 })
    .should('have.value', 'deeeeeeeeeeeeeeeeee Tal')
    cy.get('#email')
    .type('fulanoooooooooooooo.ciclano.com', { delay: 0 })
    .should('have.value', 'fulanoooooooooooooo.ciclano.com')
    cy.get('#phone')
    .type('99995555', { delay: 0 })
    .should('have.value', '99995555')
    cy.get('#firstName')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type=radio]').check('feedback')
  })
  
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]').each(($el) => {
      cy.wrap($el).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]').check(['phone', 'email']).should('be.checked')
    cy.get('#phone-checkbox').uncheck().should('not.be.checked')
    //ou
    cy.get('input[type=checkbox]').check(['phone', 'email'])
    cy.get('#phone-checkbox').last().uncheck().should('not.be.checked')
    //ou
    cy.get('input[type=checkbox]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')
    .should( input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should( input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should('contain.value', 'example.json')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
  
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})
