import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/TeamsModel';
import {
  successTeamGetAllMock,
  successTeamGetByIdMock,
} from './Mocks/TeamsMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/teams endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return successfully all teams', async () => {
    const stub = sinon
      .stub(Teams, "findAll")
      .resolves(successTeamGetAllMock as Teams[]);

    chaiHttpResponse = await chai
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successTeamGetAllMock);

    stub.restore();
  });

  it('return successfully all teams', async () => {
    const stub = sinon
        .stub(Teams, "findByPk")
        .resolves(successTeamGetByIdMock as Teams);

    chaiHttpResponse = await chai
       .request(app).get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successTeamGetByIdMock);

    stub.restore();
  });
  
});