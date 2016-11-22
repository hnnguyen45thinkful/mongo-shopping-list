global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    //Given the before function is run before each test is run. In this function you run the server, then you seed the database by adding some sample data which you can use in any of your tests.
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
  //Applying and Copying the GET test for the shopping list from the shopping list API.  
    it('should list items on GET', function(done) {
        chai.request(app)
        .get('/items')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0]._id.should.be.a('string');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
        done();
    });
});
    //Applying and Copying the POST test for the shopping list from the shopping list API.
        it('should list items on GET', function(done) {
            chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
        done();
      });
  });
//Applying and Copying the PUT test for the shopping list from the shopping list API.      
        it('should edit an item on PUT', function(done) {
            chai.request(app)
            .get('/items')
            .end(function(err, res) {
                var editId = res.body[0]._id;
                    chai.request(app)
                    .put('/items/' + editId)
                    .send({name: 'Kidney beans'})
                    .end(function(err, res){
                    res.should.have.status(201);
                    chai.request(app)
                    .put('/items/' + editId)
                    .end(function(err, res) {
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body._id.should.be.a('string');
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('Kidney beans');
                done();
              });
          });
      });
  });
 //Applying and Copying the DELETE test for the shopping list from the shopping list API.             
        it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
        chai.request(app)
            .delete('/items/' + res.body[0]._id)
            .end(function(err, res){
            res.should.have.status(201);
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.body.should.have.length(2);
            done();
            });
        });
    });
});  
    //Given the after function, which is run after each test is run, you remove all of the items from the database so you are starting from a clean slate for the next test
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
