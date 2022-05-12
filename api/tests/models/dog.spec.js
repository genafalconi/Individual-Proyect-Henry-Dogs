const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Raza model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Raza.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Raza.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Raza.create({ name: 'Pug' });
      });
    }),

      describe('height', () => {
        it('should throw an error if height_min is null', (done) => {
          Raza.create({})
            .then(() => done(new Error('It requires a valid height_min')))
            .catch(() => done());
        });
        it('should work when its a valid height_min', () => {
          Raza.create({ height_min: 10 });
        });
        it('should throw an error when its not a number', () => {
          Raza.create({ height_min: 'cuenta' })
            .then(() => done(new Error('It requires a valid height_min')))
            .catch(() => done());
        });
        it('should throw an error if height_max is null', (done) => {
          Raza.create({})
            .then(() => done(new Error('It requires a valid height_max')))
            .catch(() => done());
        });
        it('should work when its a valid height_max', () => {
          Raza.create({ height_max: 10 });
        });
        it('should throw an error when its not a number', () => {
          Raza.create({ height_max: 'cuenta' })
            .then(() => done(new Error('It requires a valid height_max')))
            .catch(() => done());
        });
      }),

      describe('weight', () => {
        it('should throw an error if weight_min is null', (done) => {
          Raza.create({})
            .then(() => done(new Error('It requires a valid weight_min')))
            .catch(() => done());
        });
        it('should work when its a valid weight_min', () => {
          Raza.create({ weight_min: 10 });
        });
        it('should throw an error when its not a number', () => {
          Raza.create({ weight_min: 'cuenta' })
            .then(() => done(new Error('It requires a valid weight_min')))
            .catch(() => done());
        });
        it('should throw an error if weight_max is null', (done) => {
          Raza.create({})
            .then(() => done(new Error('It requires a valid weight_max')))
            .catch(() => done());
        });
        it('should work when its a valid weight_max', () => {
          Raza.create({ weight_max: 10 });
        });
        it('should throw an error when its not a number', () => {
          Raza.create({ weight_max: 'cuenta' })
            .then(() => done(new Error('It requires a valid weight_max')))
            .catch(() => done());
        });
      }),

      describe('img', () => {
        it('should throw an error if lenght img is not a string', (done) => {
          Raza.create({})
            .then(() => done(new Error('It requires a valid img')))
            .catch(() => done());
        });
        it('should work when its a valid img', () => {
          Raza.create({ img: 'https://dam.ngenespanol.com/wp-content/uploads/2019/10/perros-personalidad-2.jpg' });
        });
      })
  });
});
