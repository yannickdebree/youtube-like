import path from 'path';
import request from 'supertest';
import app from '../src/app';
import { EMPTY_VIDEO_SOURCE, UNAUTHORIZED } from '../src/utils/http-messages';

describe('videos (REST)', () => {
    describe("Can upload video", () => {
        describe('Without required infos', () => {
            it("Cannot upload video with sign out", async () => {
                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { accessToken } } } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { uid } } } = await request(app.callback())
                    .post('/pages')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ name: 'Name' });
                const { body } = await request(app.callback()).post(`/pages/${uid}/videos`).expect(401);
                expect(body.message).toBe(UNAUTHORIZED);
            });

            it("Cannot upload video without source", async () => {
                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { accessToken } } } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { uid } } } = await request(app.callback())
                    .post('/pages')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ name: 'Name' });
                const { body } = await request(app.callback()).post(`/pages/${uid}/videos`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .expect(422);
                expect(body.message).toBe(EMPTY_VIDEO_SOURCE)
            });


            it("Cannot upload video on an foreign page", async () => {
                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { accessToken } } } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { uid } } } = await request(app.callback())
                    .post('/pages')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ name: 'Name' });
                const { body } = await request(app.callback()).post(`/pages/${uid}1/videos`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .expect(401);
                expect(body.message).toBe(UNAUTHORIZED)
            });
        });

        describe('With required infos', () => {
            it("Can upload video with source", async () => {
                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { accessToken } } } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { uid } } } = await request(app.callback())
                    .post('/pages')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ name: 'Name' });
                await request(app.callback()).post(`/pages/${uid}/videos`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .attach('source', path.join(__dirname, './video_test.mp4'))
                    .expect(201)
            })

            it("Can upload video with source and optionnal data", async () => {

                await request(app.callback())
                    .post('/accounts')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { accessToken } } } = await request(app.callback())
                    .post('/auth')
                    .send({
                        email: 'test@test.com',
                        password: '$testtest',
                    });
                const { body: { data: { uid } } } = await request(app.callback())
                    .post('/pages')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ name: 'Name' });
                await request(app.callback()).post(`/pages/${uid}/videos`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .field("name", "Name")
                    .field('description', "Description")
                    .attach('source', path.join(__dirname, './video_test.mp4'))
                    .expect(201);
            })
        });
    });

    it.todo("Can access to a video");
    it.todo("Can update a video");
    it.todo("Can remove a video");
})