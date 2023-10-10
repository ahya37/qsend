const web = require('../aplications/web');
const supertest = require('supertest');
const { removeTestUser } = require('./test.utils');

describe('POST /api/auth/register', function(){

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can register new user', async function() {
        const result = await supertest(web)
            .post('/api/auth/register')
            .send({
                name:'test',
                phone:'081281529300',
                email:'test@gmail.com',
                password:'test'
            });
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.phone).toBe('081281529300');
        expect(result.body.data.email).toBe('test@gmail.com');
        expect(result.body.data.password).toBeDefined();
        expect(result.body.message).toBe('user was registerd successfully!');
    });

    it('should reject if request is invalid', async function() {

        const result = await supertest(web)
            .post('/api/auth/register')
            .send({
                name:'',
                phone:'',
                email:'',
                password:''
            });

        expect(result.status).toBe(400);
        expect(result.body.message).toBe('request is invalid!');

    });

    it('should reject if email already registered', async function() {

        let result = await supertest(web)
            .post('/api/auth/register')
            .send({
                name:'test',
                phone:'081281529300',
                email:'test@gmail.com',
                password:'test'
            });
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.phone).toBe('081281529300');
        expect(result.body.data.email).toBe('test@gmail.com');
        expect(result.body.data.password).toBeDefined();
        expect(result.body.message).toBe('user was registerd successfully!');

        result = await supertest(web)
            .post('/api/auth/register')
            .send({
                name:'test',
                phone:'081281529300',
                email:'test@gmail.com',
                password:'test'
            });
        expect(result.status).toBe(400);
        expect(result.body.message).toBeDefined();

    });
});
