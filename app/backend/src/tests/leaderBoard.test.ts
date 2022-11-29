import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel'
import {
  successHomeResultMock,
  successAwayResultMock,
  successResultMock,
  teamsMocks,
  matchesMock,
} from './Mocks/LeaderBoardMocks';

import { Response } from 'superagent';
import { IMatches } from '../interfaces/IMatches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/leaderboard endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return HomeTeam successfully', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMocks as Teams[]);
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as IMatches[])
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successHomeResultMock);
  });

  it('return HomeTeam successfully', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMocks as Teams[]);
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as IMatches[])
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successAwayResultMock);
  });

  it('return all teams successfully', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMocks as Teams[]);
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesMock as IMatches[])
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(successResultMock);
  });
})