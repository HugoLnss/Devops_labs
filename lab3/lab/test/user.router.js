const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  // describe('GET /user', ()=> {
    describe('GET /user', ()=> {
      // TODO Create test for the get method
      it('get a user by username', (done) => {
        const user = {
          username: 'johndoe',
          firstname: 'John',
          lastname: 'Doe'
        }
        chai.request(app)
          .post('/user')
          .send(user)
          .then(() => {
            chai.request(app)
              .get('/user/johndoe')
              .then((res) => {
                chai.expect(res).to.have.status(200)
                chai.expect(res.body.status).to.equal('success')
                chai.expect(res.body.data.username).to.equal('johndoe')
                chai.expect(res.body.data.firstname).to.equal('John')
                chai.expect(res.body.data.lastname).to.equal('Doe')
                chai.expect(res).to.be.json
                done()
              })
              .catch((err) => {
                throw err
              })
          })
          .catch((err) => {
            throw err
          })
      })
      
      it('cannot get a user when it does not exist', (done) => {
        chai.request(app)
          .get('/user/johndoe')
          .then((res) => {
            chai.expect(res).to.have.status(404)
            chai.expect(res.body.status).to.equal('error')
            chai.expect(res).to.be.json
            done()
          })
          .catch((err) => {
            throw err
          })
      })
    })
})
