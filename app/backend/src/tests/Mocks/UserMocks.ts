export const userDataMock = {
  dataValues: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  _previousDataValues: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  uniqno: 1,
  _options: {
    isNewRecord: false,
    _schema: null,
    _schemaDelimiter: '',
    raw: true,
    attributes: [ 'id', 'username', 'role', 'email', 'password' ]
  },
  isNewRecord: false
}

export const successRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const failedRequestByMissingPassword = {
  email: 'admin@admin.com',
  password: ''
}

export const failedRequestByWrongPassword = {
  email: 'admin@admin.com',
  password: 'fsdfs'
}

export const failedRequestByMissingEmail = {
  email: '',
  password: 'secret_admin'
}

export const failedRequestByWrongEmail = {
  email: 'notexist@user.com',
  password: 'secret_admin'
}

export const failedResponseByMissing = {
  message: 'All fields must be filled'
}

export const failedResponseByWrong = {
  message: 'Incorrect email or password'
}

export const successLoginValidateMock = {
  role: 'admin'
}