describe('Bootcampium Tests - Happy path', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Visits dev.bg', () => {
        cy.contains('Bootcampium')
    })

    it('Open posts', () => {
        cy.contains('Posts').click()
        cy.contains('Add New Post')
    })

    it.only('Go to posts and add a new one', () => {
        cy.contains('Posts').click()
        cy.contains('Add New Post').click()
        cy.get('#postTitle').type('Bootcamp summary')
        cy.get('#postAuthor').select('1')
        cy.get('#postContent').type('It was precious')
        cy.contains('Save Post').click()
        cy.contains('Go to posts').click()
        cy.contains('Bootcamp summary')
    })
})
