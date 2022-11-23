import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import {
  userDataMock,
  successRequest,
  failedRequestByMissingPassword,
  failedRequestByWrongPassword,
  failedRequestByMissingEmail,
  failedRequestByWrongEmail,
  failedResponseByMissing,
  failedResponseByWrong,
  successLoginValidateMock,
} from './Mocks/UserMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/login endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return success', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userDataMock as User);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('return fail by missing password', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByMissingPassword)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByMissing);
  });

  it('return fail by missing email', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByMissingEmail)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByMissing);
  });

  it('return fail by wrong password', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userDataMock as User);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByWrongPassword)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByWrong);
  });

  it('return fail by wrong email', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByWrongEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByWrong);
  });
});

describe('Test of the /login/validate endpoint', () => {
  let chaiHttpResponse: Response;

  it('return success', async () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userDataMock as User);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    const chaiHttpResponse2 = await chai
      .request(app).get('/login/validate')
      .set('Authorization', chaiHttpResponse.body.token);

    expect(chaiHttpResponse2.body).to.be.deep.equal(successLoginValidateMock);
  });
})