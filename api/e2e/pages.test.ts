import request from 'supertest'
import app from '../src/app'
import { EMPTY_NAME, UNAUTHORIZED } from '../src/utils/http-messages'

describe('pages (REST)', () => {
    describe('Can create a page', () => {
        it('Cannot create a page as signed out', async () => {
            const { body } = await request(app.callback())
                .post('/pages')
                .send()
                .expect(401)
            expect(body.message).toBe(UNAUTHORIZED)
        })

        it('Cannot create a page without name', async () => {
            await request(app.callback()).post('/accounts').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const {
                body: {
                    data: { accessToken },
                },
            } = await request(app.callback()).post('/auth').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const { body } = await request(app.callback())
                .post('/pages')
                .set('Authorization', `Bearer ${accessToken}`)
                .send()
                .expect(422)
            expect(body.message).toBe(EMPTY_NAME)
        })

        it('Cannot create a page with empty name', async () => {
            await request(app.callback()).post('/accounts').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const {
                body: {
                    data: { accessToken },
                },
            } = await request(app.callback()).post('/auth').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const { body } = await request(app.callback())
                .post('/pages')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ name: '' })
                .expect(422)
            expect(body.message).toBe(EMPTY_NAME)
        })

        it('Can create a page with a name', async () => {
            await request(app.callback()).post('/accounts').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const {
                body: {
                    data: { accessToken },
                },
            } = await request(app.callback()).post('/auth').send({
                email: 'test@test.com',
                password: '$testtest',
            })
            const { body } = await request(app.callback())
                .post('/pages')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ name: 'My name' })
                .expect(201)
            expect(body.data.uid).toBeDefined()
        })
    })

    it.todo('Can access to a page')

    it.todo('Can update a page')

    it.todo('Can remove a page')
})
