const User = require("../../models/user");
const GrievanceLog = require("../../models/grievanceLog");
const Grievance = require("../../models/grievance");

const express = require("express");
const _ = require("lodash");

const router = express.Router();

const verifyRole = (req, res, next) => {
  if (req && req.user && req.user.role) {
    if (req.user.role === "O") {
      next();
    } else {
      res.status(403).send({ errorMessage: "Not right role" });
    }
  } else {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

router.use(verifyRole);

router.get("/grievances/:status", (req, res) => {
  var isClosed = req.params.status;
  if (!(isClosed === "false")) {
    return res.status(404).send();
  }
  var dateSortFactor = isClosed === "false" ? "createdAt" : "updatedAt";
  Grievance.findAll({
    where: { isClosed: 0, status: "O" }
  })
    .then(grievances => {
      res.send(grievances);
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //GET retrieve grievances for ombudsman according to status '/ombudsman/grievances/:status'

router.post("/grievancelog", (req, res) => {
  GrievanceLog.sync()
    .then(() => {
      return GrievanceLog.create({
        log: req.body.log,
        grievanceId: req.body.grievanceid,
        userId: req.user.id
      });
    })
    .then(grievanceLog => {
      res.send(grievanceLog);
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //POST create grievance log for ombudsman '/ombudsman/grievancelog'

router.get("/grievancelog/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id, status: "O" } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      GrievanceLog.findAll({
        where: { grievanceId: grievance.id },
        order: [["createdAt", "DESC"]]
      })
        .then(log => {
          res.send(log);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    })
    .catch(err => {
      res.status(400).send(err);
    });
}); //GET retrieve grievance log for ombudsman '/ombudsman/grievancelog/:id'

router.patch("/grievance/escalate/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send({
      errorMessage: "id should be an integer"
    });
  }
  if (!(_.isString(req.body.status) && req.body.status === "A")) res.send(400);
  var body = {};
  body.status = req.body.status;
  Grievance.findByPk(id)
    .then(grievance => {
      if (grievance.isClosed === true || grievance.status !== "O") {
        return res.status(400).send();
      } else {
        if (body.status === "O") body.timeTillEscalation = 0;
        Grievance.update(body, {
          where: { id }
        })
          .then(grievance => {
            res.send(body);
          })
          .catch(err => {
            res.status(400).send({
              errorMessage: err
            });
          });
      }
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //PATCH escalate ombudsman for principal '/ombudsman/grievance/close/:status'

module.exports = router;
