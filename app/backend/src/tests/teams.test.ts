import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/TeamsModel';
import {
  succsessTeamGetAllMock,
} from './Mocks/TeamsMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/teams endpoint tests: ', () => {
  let chaiHttpResponse: Response;

  it('return successfully all teams', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(succsessTeamGetAllMock as Teams[]);
    });

    after(()=>{
      sinon.restore();
    })

    chaiHttpResponse = await chai
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  // it('return success', async () => {
  //   before(async () => {
  //     sinon
  //       .stub(Teams, "findAll")
  //       .resolves(succsessTeamGetAllMock as Teams[]);
  //   });

  //   after(()=>{
  //     sinon.restore();
  //   })

  //   chaiHttpResponse = await chai
  //      .request(app).post('/login').send(successRequest)

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  // });
  
});