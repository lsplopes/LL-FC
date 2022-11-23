import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/IMatches';
import {
  successGetAllMatchesMock,
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
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  // it('return successfully all teams', async () => {
  //   before(async () => {
  //     sinon
  //       .stub(Teams, "findByPk")
  //       .resolves(succsessTeamGetByIdMock as Teams);
  //   });

  //   after(()=>{
  //     sinon.restore();
  //   })

  //   chaiHttpResponse = await chai
  //      .request(app).get('/teams/1')

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  // });
  
});