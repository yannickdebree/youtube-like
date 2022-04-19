import path from 'path';
import request from 'supertest';
import app from '../src/app';
import { EMPTY_VIDEO_SOURCE, UNAUTHORIZED } from '../src/utils/http-messages';

describe('videos (REST)', () => {
    describe("Can upload video", () => {
        describe('Without required infos', () => {
            it("Cannot upload video with sign out", (done) => {
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
                                const accessToken = body.data.accessToken;
                                request(app.callback())
                                    .post('/pages')
                                    .set('Authorization', `Bearer ${accessToken}`)
                                    .send({ name: 'Name' })
                                    .then(({ body }) => {
                                        const uid = body.data.uid;
                                        request(app.callback()).post(`/pages/${uid}/videos`).expect(401).then(({ body }) => {
                                            expect(body.message).toBe(UNAUTHORIZED);
                                            done();
                                        })
                                    });
                            });
                    });
            });

            it("Cannot upload video without source", done => {
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
                                const accessToken = body.data.accessToken;
                                request(app.callback())
                                    .post('/pages')
                                    .set('Authorization', `Bearer ${accessToken}`)
                                    .send({ name: 'Name' })
                                    .then(({ body }) => {
                                        const uid = body.data.uid;
                                        request(app.callback()).post(`/pages/${uid}/videos`)
                                            .set('Authorization', `Bearer ${accessToken}`)
                                            .expect(422)
                                            .then(({ body }) => {
                                                expect(body.message).toBe(EMPTY_VIDEO_SOURCE)
                                                done()
                                            })
                                    })
                            })
                    })
            });


            it("Cannot upload video on an foreign page", done => {
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
                                const accessToken = body.data.accessToken;
                                request(app.callback())
                                    .post('/pages')
                                    .set('Authorization', `Bearer ${accessToken}`)
                                    .send({ name: 'Name' })
                                    .then(({ body }) => {
                                        const uid = body.data.uid;
                                        request(app.callback()).post(`/pages/${uid}1/videos`)
                                            .set('Authorization', `Bearer ${accessToken}`)
                                            .expect(401)
                                            .then(({ body }) => {
                                                expect(body.message).toBe(UNAUTHORIZED)
                                                done()
                                            })
                                    })
                            })
                    })
            });
        });

        describe('With required infos', () => {
            it("Can upload video with source", (done) => {
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
                                const accessToken = body.data.accessToken;
                                request(app.callback())
                                    .post('/pages')
                                    .set('Authorization', `Bearer ${accessToken}`)
                                    .send({ name: 'Name' })
                                    .then(({ body }) => {
                                        const uid = body.data.uid;
                                        request(app.callback()).post(`/pages/${uid}/videos`)
                                            .set('Authorization', `Bearer ${accessToken}`)
                                            .attach('source', path.join(__dirname, './video_test.mp4'))
                                            .expect(201, done)
                                    })
                            })
                    })

            })
            it("Can upload video with source and optionnal data", (done) => {
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
                                const accessToken = body.data.accessToken;
                                request(app.callback())
                                    .post('/pages')
                                    .set('Authorization', `Bearer ${accessToken}`)
                                    .send({ name: 'Name' })
                                    .then(({ body }) => {
                                        const uid = body.data.uid;
                                        request(app.callback()).post(`/pages/${uid}/videos`)
                                            .set('Authorization', `Bearer ${accessToken}`)
                                            .field("name", "Name")
                                            .field('description', "Description")
                                            .attach('source', path.join(__dirname, './video_test.mp4'))
                                            .expect(201, done);
                                    })
                            })
                    })
            })
        });
    });

    it.todo("Can access to a video");
    it.todo("Can update a video");
    it.todo("Can remove a video");
})