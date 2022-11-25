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
} from './Mocks/MatchesMocks';

import { Response } from 'superagent';

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
        .resolves(successGetAllTrueMatchesMock as IMatches[]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});