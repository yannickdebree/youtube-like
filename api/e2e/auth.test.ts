import request from 'supertest'
import app from '../src/app'
import {
    EMAIL_FORMAT_ERROR,
    PASSWORD_FORMAT_ERROR,
    UNAUTHORIZED,
    UNKNOWN_SIGN_IN_METHOD,
} from '../src/utils/http-messages'

describe('auth (REST)', () => {
    describe('Can sign in', () => {
        describe('Without correct infos', () => {
            it('Cannot sign in with password and without email', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        password: '$testtest',
                    })
                    .expect(400)
                expect(body.message).toBe(UNKNOWN_SIGN_IN_METHOD)
            })

            it('Cannot sign in with email and without password', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                    })
                    .expect(400)
                expect(body.message).toBe(UNKNOWN_SIGN_IN_METHOD)
            })

            it('Cannot sign in with empty email and empty password', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: '',
                        password: '',
                    })
                    .expect(400)
                expect(body.message).toBe(UNKNOWN_SIGN_IN_METHOD)
            })

            it('Cannot sign in with email and empty password', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '',
                    })
                    .expect(400)
                expect(body.message).toBe(UNKNOWN_SIGN_IN_METHOD)
            })

            it('Cannot sign in with password and empty email', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: '',
                        password: '$testtest',
                    })
                    .expect(400)
                expect(body.message).toBe(UNKNOWN_SIGN_IN_METHOD)
            })

            it('Cannot sign in with email as wrong format', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'wrongEmail',
                        password: '$testtest',
                    })
                    .expect(422)
                expect(body.message).toBe(EMAIL_FORMAT_ERROR)
            })

            it('Cannot sign in with password as wrong format', async () => {
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: 'short',
                    })
                    .expect(422)
                expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
            })
        })

        describe('With correct infos', () => {
            it('Can sign in with equivalent data', async () => {
                await request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: '$testtest',
                })
                const {
                    body: { data },
                } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    })
                    .expect(200)
                expect(data.email).toBeUndefined()
                expect(data.accessToken).toBeDefined()
            })

            it('Cannot sign in without equivalent data', async () => {
                await request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: '$testtest',
                })
                const { body } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test1@test.com',
                        password: '$testtest',
                    })
                    .expect(401)
                expect(body.message).toBe(UNAUTHORIZED)
            })
        })
    })
})
