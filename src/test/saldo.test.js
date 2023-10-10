const web = require('../aplications/web');
const supertest = require('supertest');
const { getTestUser, createTestUser, removeAllTestAccounts } = require('./test.utils');
const {logger} = require('../util/logging');

describe('POST /api/saldo', function(){

    beforeEach(async () => {
        await createTestUser();
        
    });

    afterEach(async () => {
        await removeAllTestAccounts();
    });

    it('should can create saldo', async function() {
        const login = await supertest(web)
                .post('/api/auth/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'test'
                });

        const testUser = await getTestUser();
        
        const result  = await supertest(web)
            .post('/api/saldo')
            .set('Authorization',login.body.accessToken)
            .send({
                user_id: testUser.id,
                amount: 100000,
                balance: 100000,
                last_balance: 100000,
                createdBy: testUser.id, 
            });
        
        logger.info(result);
        expect(result.status).toBe(200);
    });
})


