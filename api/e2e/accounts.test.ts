import request from 'supertest'
import app from '../src/app'
import {
    EMAIl_EVEN_USED,
    EMAIL_FORMAT_ERROR,
    PASSWORD_FORMAT_ERROR
} from '../src/utils/http-messages'

describe.skip('accounts (REST)', () => {
    describe('Can create account', () => {
        describe.skip('Without correct infos', () => {
            it('Cannot create account without email', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        password: '$testtest',
                    })
                    .expect(422);
                expect(body.message).toBe(EMAIL_FORMAT_ERROR)
            });

            it('Cannot create account without password', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                    })
                    .expect(422);
                expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
            })

            it('Cannot create account with empty infos', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: '',
                        password: '',
                    })
                    .expect(422);
                expect(body.message).toBe(EMAIL_FORMAT_ERROR)
            })

            it('Cannot create account with empty password', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '',
                    })
                    .expect(422)
                expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
            })

            it('Cannot create account with empty email', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: '',
                        password: '$testtest',
                    })
                    .expect(422);
                expect(body.message).toBe(EMAIL_FORMAT_ERROR)
            })

            it('Cannot create account with email as wrong format', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'wrongEmail',
                        password: '$testtest',
                    })
                    .expect(422);
                expect(body.message).toBe(EMAIL_FORMAT_ERROR)
            })

            it('Cannot create account with password as wrong format', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: 'short',
                    })
                    .expect(422);
                expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
            })
        })

        describe.only('With correct infos', () => {
            it('Can create account with correct infos', async () => {
                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    })
                    .expect(201)
            })

            it('Cannot create account with used email', async () => {
                const { body } = await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    })
                    .expect(422);
                expect(body.message).toBe(EMAIl_EVEN_USED)
            })
        })
    })

    it.todo('Can update account')

    it.todo('Can delete account')
})
