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
    const stub = sinon
      .stub(User, "findOne")
      .resolves(userDataMock as any);

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(Object.keys(chaiHttpResponse.body)[0]).to.be.deep.equal('token');

    stub.restore();
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
    const stub = sinon
        .stub(User, "findOne")
        .resolves(userDataMock as any);

    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByWrongPassword)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByWrong);

    stub.restore();
  });

  it('return fail by wrong email', async () => {
    const stub = sinon
        .stub(User, "findOne")
        .resolves(null);

    chaiHttpResponse = await chai
       .request(app).post('/login').send(failedRequestByWrongEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(failedResponseByWrong);

    stub.restore();
  });
});

describe('Test of the /login/validate endpoint', () => {
  let chaiHttpResponse: Response;

  it('return success', async () => {
    const stub = sinon
        .stub(User, "findOne")
        .resolves(userDataMock as any);

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    const chaiHttpResponse2 = await chai
      .request(app).get('/login/validate')
      .set('Authorization', chaiHttpResponse.body.token);

    expect(chaiHttpResponse2.body).to.be.deep.equal(successLoginValidateMock);

    stub.restore();
  });
})