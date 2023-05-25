/// <reference types="Cypress" /> 

//esta linha de cima é um comentário especial pedindo para o cypress
//buscar como referência os tipos de cypress

describe('Central de Atendimento ao Cliente TAT', function() {// sempre começa com um texto descritivo da switch, do teste e o segundo argumento será uma função de callback
  
  beforeEach(function(){// antes de executar o teste visite o endereço abaixo
    cy.visit('src/index.html')
  })  
  
  it('verifica o título da aplicação', function() {// it-> é o test case
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

  //.only ajuda para executar somente este teste. Supondo que eu já tenha muitos testes o .only me ajuda a testar desta vez somente esse aqui
  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('paulofilhorogerio@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.get('button[type="submit"]').click() //  no playground sugeriu a classe html .button mas o professor sugeriu o type
    
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('paulofilhorogerio@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo do telefone vazio quando um caractere não numérico for digitado', function(){
    cy.get('#phone')
      .type('abc')
      .should('have.value','')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('paulofilhorogerio@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

})
