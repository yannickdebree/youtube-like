import request from "supertest";
import api from '../src/app';
import { EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../src/utils/http-messages";

describe('Accounts', () => {
    it('Can create account', (done) => {
        request(api.callback()).post('/accounts').send({
            password: '$testtest'
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(EMAIL_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: 'test@test.com',
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: '',
            password: ''
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(EMAIL_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: 'test@test.com',
            password: ''
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: '',
            password: '$testtest'
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(EMAIL_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: 'wrongEmail',
            password: '$testtest'
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(EMAIL_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: 'test@test.com',
            password: 'short'
        }).expect(422).then(({ body }) => {
            expect(body.message).toBe(PASSWORD_FORMAT_ERROR)
        });

        request(api.callback()).post('/accounts').send({
            email: 'test@test.com',
            password: '$testtest'
        }).expect(201, done);
    });

    it.todo('Can update account');

    it.todo('Can delete account');
});