const User = require("../../models/user");
const Grievance = require("../../models/grievance");
const GrievanceLog = require("../../models/grievanceLog");

const formRoutes = require("./formRoutes");

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

router.use("/form", formRoutes);

router.get("/grievances/:status", (req, res) => {
  var isClosed = req.params.status;
  if (!(isClosed === "false" || isClosed === "true")) {
    return res.status(404).send();
  }
  isClosed = isClosed === "false" ? 0 : 1;
  var dateSortFactor = isClosed === "false" ? "createdAt" : "updatedAt";
  Grievance.findAll({
    where: { userId: req.user.id, isClosed },
    order: [[dateSortFactor, "DESC"]]
  })
    .then(grievances => {
      res.send(grievances);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}); //GET retrieve grievances for students '/student/grievances/:status'

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
        subcategoryId: req.body.subcategoryid,
        userId: req.user.id
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
  Grievance.findOne({ where: { id: id, userId: req.user.id } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      res.send(grievance);
    })
    .catch(err => {
      res.status(400).send();
    });
}); //GET retrieve grievance for students '/student/grievance/:id'

router.patch("/grievance/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send({
      errorMessage: "id should be an integer"
    });
  }

  var body = {};
  if (
    !(_.isBoolean(req.body.isClosed) || req.body.isClosed === undefined) &&
    ((_.isString(req.body.status) && length(req.body.status) === 1) ||
      req.body.status === undefined)
  )
    res.send(400);
  if (req.body.isClosed) body.isClosed = true;
  if (req.body.status === "A") {
    body.isClosed = false;
    body.status = "A";
    body.closedBy = null;
  }
  Grievance.findOne({ where: { id, userId: req.user.id } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      console.log(grievance);
      if (
        body.status === "A" &&
        !(grievance.closedBy === "P" || grievance.closedBy === "C")
      )
        return res.status(400).send();
      Grievance.update(body, {
        where: { id: id, userId: req.user.id }
      })
        .then(grievance => {
          res.send({ grievance });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    })
    .catch(err => {
      res.status(400).send();
    });
}); //PATCH update grievance for students '/student/grievance/:id'

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
}); //POST create grievance log for students '/student/grievance'

router.get("/grievancelog/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id: id, userId: req.user.id } })
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
}); //GET retrieve grievance log for students '/student/grievancelog/:id'

module.exports = router;
