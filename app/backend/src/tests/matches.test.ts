import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/IMatches';
import {
  successGetAllMatchesMock,
  successGetAllTrueMatchesMock,
  successGetAllFalseMatchesMock,
  successMatchInsertion,
  successMatchInsertionReturn,
  failedMatchInsertionEqualTeams,
  finishedMessageMock,
  updatedMessageMock,
} from './Mocks/MatchesMocks';

import { Response } from 'superagent';
import { successRequest } from './Mocks/UserMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/matches endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return successfully all matches', async () => {
    const stub = sinon
        .stub(MatchesModel, "findAll")
        .resolves(successGetAllMatchesMock as IMatches[]);

        
    chaiHttpResponse = await chai
    .request(app).get('/matches')
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successGetAllMatchesMock);
    stub.restore();
  });

  it('return successfully all matches in progress', async () => {
    const stub = sinon
      .stub(MatchesModel, "findAll")
      .resolves(successGetAllTrueMatchesMock as IMatches[]);

    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successGetAllTrueMatchesMock);

    stub.restore();
  });
  
  it('return successfully all matches not in progress', async () => {
    const stub = sinon
        .stub(MatchesModel, "findAll")
        .resolves(successGetAllFalseMatchesMock as IMatches[]);

    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successGetAllFalseMatchesMock);

    stub.restore();
  });
  
  it('include successfully a new match', async () => {
    const stub = sinon
      .stub(MatchesModel, "create")
      .resolves(successMatchInsertionReturn as MatchesModel);

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    const chaiHttpResponse2 = await chai
       .request(app).post('/matches')
       .set('Authorization', chaiHttpResponse.body.token)
       .send(successMatchInsertion)

    expect(chaiHttpResponse2.status).to.be.equal(201);
    expect(chaiHttpResponse2.body).to.be.deep.equal('');

    stub.restore();
  });
  
  it('Tries to include new match with a invalid Token', async () => {
    const chaiHttpResponse2 = await chai
       .request(app).post('/matches')
       .set('Authorization', 'invalidToken')
       .send(successMatchInsertion)

    expect(chaiHttpResponse2.status).to.be.equal(401);
  });
  
  it('Tries to include new match with equal teams', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)
    const chaiHttpResponse2 = await chai
       .request(app).post('/matches')
       .set('Authorization', chaiHttpResponse.body.token)
       .send(failedMatchInsertionEqualTeams)

    expect(chaiHttpResponse2.status).to.be.equal(422);
  });

  it('successfully finish a match', async () => {
    const stub = sinon
      .stub(MatchesModel, "update")
      .resolves([0]);

    chaiHttpResponse = await chai
       .request(app).patch('/matches/1/finish')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMessageMock);

    stub.restore();
  });

  it('successfully update a match', async () => {
    const stub = sinon
        .stub(MatchesModel, "update")
        .resolves([0]);

    chaiHttpResponse = await chai
       .request(app).patch('/matches/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(updatedMessageMock);

    stub.restore();
  });
});