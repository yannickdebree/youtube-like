import request from "supertest";
import app from "../src/app";

describe('pages (REST)', () => {
    describe('Can create a page', () => {
        it.skip('Cannot create a page as signed out', (done) => {
            request(app.callback()).post('/pages').send().expect(401, done);
        });

        it.skip('Cannot create a page without name', (done) => {
            request(app.callback()).post('/accounts').send({
                email: 'test@test.com',
                password: '$testtest'
            }).then(() => {
                request(app.callback()).post('/auth').send({
                    email: 'test@test.com',
                    password: '$testtest'
                }).then(() => {
                    request(app.callback()).post('/pages').send().expect(422, done);
                })
            });
        });

        // it.todo('Cannot create a page with empty name', (done) => {
        //     request(app.callback()).post('/pages').send({ name: '' }).expect(422, done);
        // });

        // it.todo('Can create a page with a name', (done) => {
        //     request(app.callback()).post('/pages').send({
        //         name: "My page"
        //     }).expect(201).then(({ body }) => {
        //         expect(body.data.name).toBe("My page");
        //         done();
        //     });
        // });
    })

    it.todo('Can update a page')

    it.todo('Can remove a page')
})