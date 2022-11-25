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
} from './Mocks/MatchesMocks';

import { Response } from 'superagent';
import { successRequest } from './Mocks/UserMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/matches endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return successfully all matches', async () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(successGetAllMatchesMock as IMatches[]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('return successfully all matches in progress', async () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(successGetAllTrueMatchesMock as IMatches[]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  
  it('return successfully all matches not in progress', async () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(successGetAllFalseMatchesMock as IMatches[]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  
  it('include successfully a new match', async () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "create")
        .resolves(successMatchInsertionReturn as MatchesModel);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).post('/login').send(successRequest)

    const chaiHttpResponse2 = await chai
       .request(app).post('/matches')
       .set('Authorization', chaiHttpResponse.body.token)
       .send(successMatchInsertion)

    expect(chaiHttpResponse2.status).to.be.equal(201);
  });

  it('return successfully finish a match', async () => {
    before(async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves([0]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).patch('/matches/1/finish')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});