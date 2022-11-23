import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import {
  userDataMock,
  successRequest,
  tokenMock
} from './Mocks/UserMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userDataMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(tokenMock);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
