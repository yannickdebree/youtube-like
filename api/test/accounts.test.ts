import request from "supertest";
import app from '../src/app';
import { EMAIl_EVEN_USED, EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../src/utils/http-messages";

describe('accounts (REST)', () => {
    describe('Can create account', () => {
        describe('Without correct infos', () => {
            it('Cannot create account without email', (done) => {
                request(app.callback()).post('/accounts').send({
                    password: '$testtest'
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(EMAIL_FORMAT_ERROR);
                    done();
                });
            });

            it('Cannot create account without password', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
                    done()
                });
            });

            it('Cannot create account with empty infos', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: '',
                    password: ''
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(EMAIL_FORMAT_ERROR)
                    done()
                });
            });

            it('Cannot create account with empty password', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: ''
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(PASSWORD_FORMAT_ERROR);
                    done()
                });
            })

            it('Cannot create account with empty email', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: '',
                    password: '$testtest'
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(EMAIL_FORMAT_ERROR);
                    done();
                });
            });

            it('Cannot create account with email as wrong format', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'wrongEmail',
                    password: '$testtest'
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(EMAIL_FORMAT_ERROR);
                    done();
                });
            });

            it('Cannot create account with password as wrong format', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: 'short'
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(PASSWORD_FORMAT_ERROR);
                    done();
                });
            });
        });

        describe('With correct infos', () => {
            it('Can create account with correct infos', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: '$testtest'
                }).expect(201, done);
            });

            it('Cannot create account with used email', (done) => {
                request(app.callback()).post('/accounts').send({
                    email: 'test@test.com',
                    password: '$testtest'
                }).expect(422).then(({ body }) => {
                    expect(body.message).toBe(EMAIl_EVEN_USED);
                    done();
                });
            });
        })
    });

    it.todo('Can update account');

    it.todo('Can delete account');
});