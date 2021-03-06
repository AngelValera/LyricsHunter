let chai = require("chai");
let expect = chai.expect;
const chaiHttp = require("chai-http");
const groupSamples = require("../Data/sampleGroups.json");
const app = require("../src/index");

chai.use(chaiHttp);

// [HU10] Agregar nuevos Grupos de música
describe("Agregar un nuevo Grupo ", () => {
  it("Debería agregar un nuevo grupo", (done) => {
    chai
      .request(app)
      .post("/grupos")
      .send(groupSamples[0])
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(201);
        done();
      });
  });

  it("Debería obener un error al agregar un grupo que ya existe", (done) => {
    chai
      .request(app)
      .post("/grupos")
      .send(groupSamples[0])
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Debería obener un error al agregar un grupo de forma incorrecta", (done) => {
    chai
      .request(app)
      .post("/grupos")
      .send({
        nombre: "Rammstein",
        anioFormacion: 1994,
        anioSeparacion: null,
        estilo: "Metal",
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });
});

// [HU1] Consultar información de un grupo de música
describe("Obtener informacion de los grupos", () => {
  it("Debería obtener todos los grupos", (done) => {
    chai
      .request(app)
      .get("/grupos")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Debería obtener el grupo que solicito.", (done) => {
    chai
      .request(app)
      .get("/grupos/Linkin Park")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Debería obtener un error al no encontrar el grupo", (done) => {
    chai
      .request(app)
      .get("/grupos/Rammstein")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});
