'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);
describe('Location Check', () => {
  describe('/GET app', () => {
    it('should get a systems operational message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').that.equals('All systems operational');
          done();
        });
    });
  });
  describe('/POST checkLocation', () => {
    it('should return allowed true if the country of the IP address is in the whitelist', (done) => {
      const apiRequestBody = [
        '209.58.139.35', // US IP Address
        {
          BY: 'Belarus',
          AD: 'Andorra',
          US: 'United States',
          RS: 'Serbia',
        },
      ];
      chai.request(server)
        .post('/api/v1/check-location')
        .send(apiRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('allowed').that.equals(true);
          done();
        });
    });
    it('should return allowed false if the country of the IP address is not in the whitelist', (done) => {
      const apiRequestBody = [
        '209.58.139.35', // US IP Address
        {
          BY: 'Belarus',
          AD: 'Andorra',
          RS: 'Serbia',
        },
      ];
      chai.request(server)
        .post('/api/v1/check-location')
        .send(apiRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('allowed').that.equals(false);
          done();
        });
    });
    it('should return error if the IP Address is invalid', (done) => {
      const apiRequestBody = [
        '209.58.139.abc', // Invalid
        {
          BY: 'Belarus',
          AD: 'Andorra',
          US: 'United States',
          RS: 'Serbia',
        },
      ];
      chai.request(server)
        .post('/api/v1/check-location')
        .send(apiRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error').that.equals('Invalid IP Address. Try again later.');
          done();
        });
    });
    it('should return error if the whitelist is not formatted correctly or wrong type', (done) => {
      const apiRequestBody = [
        '209.58.139.35', 
        [
          'Belarus'
        ],
      ];
      chai.request(server)
        .post('/api/v1/check-location')
        .send(apiRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error').that.equals('Whitelist is not formatted correctly. Try again later.');
          done();
        });
    });
  });
});
