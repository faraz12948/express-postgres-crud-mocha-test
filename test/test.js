const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
// const app = require('../app');
const Record = require('../model/model');

chai.use(chaiHttp);
chai.should();

describe('Records', () => {
    beforeEach(async () => {
        await Record.delete(1);
    });


    it('should create a record', async () => {
        const res = await chai.request(app)
            .post('/records/add')
            .send({
                name: 'Test Record',
                email: 'record@gmail.com',
            });
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name').eql('Test Record');
        res.body.should.have.property('email').eql('record@gmail.com');
    });

    it('should retrieve a record', async () => {
        const response = await Record.create({
            name: 'Test Record',
            email: 'record@gmail.com',
        });

        const res = await chai.request(app).get(`/records/${response.id}`);

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(response.id);
        res.body.should.have.property('name').eql('Test Record');
        res.body.should.have.property('email').eql('record@gmail.com');
    });

    it('should update a record', async () => {
        const response = await Record.create({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        const res = await chai.request(app)
            .put(`/records/${response.id}`)
            .send({
                name: 'Updated Test Record',
                email: 'update@gmail.com',
            });

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(response.id);
        res.body.should.have.property('name').eql('Updated Test Record');
        res.body.should.have.property('email').eql('update@gmail.com');
    });
    it('should show all records', async () => {
        const res = await chai.request(app)
            .get('/records/users')

        res.should.have.status(200);
        res.body.should.be.a('array');

    });

    it('should delete a record', async () => {
        const response = await Record.create({
            name: 'Test Record',
            email: 'update@gmail.com',
        });
        const res = await chai.request(app).delete(`/records/${response.id}`);

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(response.id);
        res.body.should.have.property('name').eql('Test Record');
        res.body.should.have.property('email').eql('update@gmail.com');
    });
});

