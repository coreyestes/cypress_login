/// <reference types="cypress" />

describe('Login Tests', () => {

    // Initial check of login page
    it('Login page looks ok', () => {
        cy.visit('https://the-internet.herokuapp.com/login')
        cy.contains('Login').should('exist')
        cy.contains('Username').should('exist')
        cy.contains('Password').should('exist')
        cy.url().should('include', '/login')

    })

    // Valid Login
    it('Login valid', () => {
        // Navigate to login
        cy.visit('https://the-internet.herokuapp.com/login')

        // Enter known credentials
        cy.get('[id=username]').type('tomsmith')
        cy.get('[id=password]').type('SuperSecretPassword!')
        cy.get('button').click()

        // Check that error does not get displayed 
        cy.contains('Your username is invalid!').should('not.exist')
        cy.contains('Your password is invalid!').should('not.exist')

        // Verfiy that you are now in the secure area
        cy.url().should('include', '/secure')
    })

    // Invalid Login (username/password)
    it('Login Invalid (UN/PASS)', () => {
        // Navigate to the login page 
        cy.visit('https://the-internet.herokuapp.com/login')

        // Enter in incorrect credentials for both fields
        cy.get('[id=username]').type('admin')
        cy.get('[id=password]').type('admin')
        cy.get('button').click()

        // Verfiy that correct error code is displayed 
        cy.contains('Your username is invalid!').should('exist')
    })


    // Invalid Login (password)
    it('Login Invalid (PASS)', () => {
        // Navigate to the login page 
        cy.visit('https://the-internet.herokuapp.com/login')

        // Enter in incorrect credentials for password 
        cy.get('[id=username]').type('tomsmith')
        cy.get('[id=password]').type('admin')
        cy.get('button').click()

        // Verfiy that correct error code is displayed 
        cy.contains('Your password is invalid!').should('exist')

        // NOTE: Security hole, revealing that the username is OK, by calling out the password in the error
        // Should have generic "Your username or password is invalid"
    })


    // Invalid Login (username)
    it('Login Invalid (UN)', () => {
        // Navigate to the login page 
        cy.visit('https://the-internet.herokuapp.com/login')

        // Enter in incorrect credentials
        cy.get('[id=username]').type('admin')
        cy.get('[id=password]').type('SuperSecretPassword!')
        cy.get('button').click()

        // Verfiy that correct error code is displayed 
        cy.contains('Your username is invalid!').should('exist')
    })


    // Attempt to bypass login by navigating directly to the page that is secured
    it('Skip to secure area', () => {
        cy.visit('https://the-internet.herokuapp.com/secure')
        cy.contains('You must login to view the secure area!').should('exist')
    })


})


