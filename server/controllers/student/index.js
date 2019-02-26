const User = require("../../models/user");
const Grievance = require("../../models/grievance");
const GrievanceLog = require("../../models/grievanceLog");

const express = require("express");
const _ = require("lodash");

const router = express.Router();

const verifyRole = (req, res, next) => {
  if (req && req.user && req.user.role) {
    if (req.user.role === "S") {
      next();
    } else {
      res.status(403).send({ errorMessage: "Not right role" });
    }
  } else {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

router.use(verifyRole);

router.post("/grievance", (req, res) => {
  var timeMLFetch = {
    time1: 1,
    time2: 2,
    time3: 3,
    timeOF: 1
  };
  Grievance.sync()
    .then(() => {
      return Grievance.create({
        subject: req.body.subject,
        status: "C",
        timeTillEscalation: timeMLFetch.time1,
        time1: timeMLFetch.time1,
        time2: timeMLFetch.time2,
        time3: timeMLFetch.time3,
        timeOF: timeMLFetch.timeOF,
        subcategoryid: req.body.subcategoryid,
        userid: req.user.id
      });
    })
    .then(grievance => {
      res.send(grievance);
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //POST create grievance for students '/student/grievance'

router.get("/grievance/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { grievanceid: id, userid: req.user.id } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      res.send({ grievance });
    })
    .catch(err => {
      res.status(400).send();
    });
}); //GET retrieve grievance for students '/student/grievance/:id'

router.post("/grievancelog", (req, res) => {
  GrievanceLog.sync()
    .then(() => {
      return GrievanceLog.create({
        log: req.body.log,
        grievanceid: req.body.grievanceid,
        userid: req.user.id
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
}); //POST create grievance for students '/student/grievance'

router.get("/grievancelog/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { grievanceid: id, userid: req.user.id } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      GrievanceLog.findAll({
        where: {
          grievanceid: grievance.grievanceid
        }
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
}); //GET retrieve grievance log for students '/student/grievancelog/:id'

module.exports = router;
