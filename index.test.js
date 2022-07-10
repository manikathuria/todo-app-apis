const request = require('supertest')
const app = require('./index');

let token;

beforeAll((done) => {
    request(app)
        .post('/login')
        .send({
            id: 1111,
            name: "John Doe",
        })
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
});
describe('GET /', () => {
    // token not being sent - should respond with a 403
    test('It should require authorization', () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toBe(403);
            });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        task: expect.any(String),
                        completed: expect.any(Boolean)
                    })
                ]))
            });
    });
});
describe('POST /', () => {
    // token not being sent - should respond with a 403
    test('It should require authorization', () => {
        return request(app)
            .post('/').send(({
                task: "so your assignment"
            }))
            .then((response) => {
                expect(response.statusCode).toBe(403);
            });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(app)
            .post('/').send(({
                task: "so your assignment"
            }))
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body).toEqual(expect.objectContaining({
                    task: expect.objectContaining({
                        task: expect.any(String),
                        completed: expect.any(Boolean)
                    }),
                    text: "Task Added Successfully!!",
                }))
            });
    });
})
describe('PUT /id', () => {
    // token not being sent - should respond with a 403
    test('It should require authorization', () => {
        return request(app)
            .put('/62caa98f93c4f928d90f09fc').send(({
                task: "code in nodejs",
                completed: true
            }))
            .then((response) => {
                expect(response.statusCode).toBe(403);
            });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(app)
            .put('/62caa98f93c4f928d90f09fc').send(({
                task: "code in nodejs",
                completed: true
            }))
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body).toEqual(expect.objectContaining({
                    task: expect.objectContaining({
                        task: expect.any(String),
                        completed: expect.any(Boolean)
                    }),
                    text: "Task Updated Successfully!!",
                }))
            });
    });
})
describe('DELETE /id', () => {
    // token not being sent - should respond with a 403
    test('It should require authorization', () => {
        return request(app)
            .delete('/62caa98f93c4f928d90f09fc').send(({
                task: "code in nodejs",
                completed: true
            }))
            .then((response) => {
                expect(response.statusCode).toBe(403);
            });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(app)
            .delete('/62caa98f93c4f928d90f09fc').send(({
                task: "code in nodejs",
                completed: true
            }))
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body).toEqual(expect.objectContaining({
                    task: expect.objectContaining({
                        task: expect.any(String),
                        completed: expect.any(Boolean)
                    }),
                    text: "Task Deleted Successfully!!",
                }))
            });
    });
})



