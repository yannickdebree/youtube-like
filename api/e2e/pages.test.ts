import request from 'supertest'
import app from '../src/app'
import { EMPTY_NAME, UNAUTHORIZED } from '../src/utils/http-messages'

describe('pages (REST)', () => {
    describe('Can create a page', () => {
        it('Cannot create a page as signed out', (done) => {
            request(app.callback())
                .post('/pages')
                .send()
                .expect(401)
                .then(({ body }) => {
                    expect(body.message).toBe(UNAUTHORIZED)
                    done()
                })
        })

        it('Cannot create a page without name', (done) => {
            request(app.callback())
                .post('/accounts')
                .send({
                    email: 'test@test.com',
                    password: '$testtest',
                })
                .then(() => {
                    request(app.callback())
                        .post('/auth')
                        .send({
                            email: 'test@test.com',
                            password: '$testtest',
                        })
                        .then(({ body }) => {
                            request(app.callback())
                                .post('/pages')
                                .set('Authorization', `Bearer ${body.data.accessToken}`)
                                .send()
                                .expect(422)
                                .then(({ body }) => {
                                    expect(body.message).toBe(EMPTY_NAME)
                                    done()
                                })
                        })
                })
        })

        it('Cannot create a page with empty name', (done) => {
            request(app.callback())
                .post('/accounts')
                .send({
                    email: 'test@test.com',
                    password: '$testtest',
                })
                .then(() => {
                    request(app.callback())
                        .post('/auth')
                        .send({
                            email: 'test@test.com',
                            password: '$testtest',
                        })
                        .then(({ body }) => {
                            request(app.callback())
                                .post('/pages')
                                .set('Authorization', `Bearer ${body.data.accessToken}`)
                                .send({ name: '' })
                                .expect(422)
                                .then(({ body }) => {
                                    expect(body.message).toBe(EMPTY_NAME)
                                    done()
                                })
                        })
                })
        })

        it('Can create a page with a name', (done) => {
            request(app.callback())
                .post('/accounts')
                .send({
                    email: 'test@test.com',
                    password: '$testtest',
                })
                .then(() => {
                    request(app.callback())
                        .post('/auth')
                        .send({
                            email: 'test@test.com',
                            password: '$testtest',
                        })
                        .then(({ body }) => {
                            request(app.callback())
                                .post('/pages')
                                .set('Authorization', `Bearer ${body.data.accessToken}`)
                                .send({ name: 'My name' })
                                .expect(201)
                                .then(({ body }) => {
                                    expect(body.data.uid).toBeDefined()
                                    done()
                                })
                        })
                })
        })
    })

    it.todo('Can access to a page')

    it.todo('Can update a page')

    it.todo('Can remove a page')
})
