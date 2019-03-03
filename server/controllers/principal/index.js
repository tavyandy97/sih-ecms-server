const User = require("../../models/user");
const Grievance = require("../../models/grievance");
const GrievanceLog = require("../../models/grievanceLog");
const express = require("express");
const _ = require("lodash");

const router = express.Router();

const verifyRole = (req, res, next) => {
  if (req && req.user && req.user.role) {
    if (req.user.role === "P") {
      next();
    } else {
      res.status(403).send({ errorMessage: "Not right role" });
    }
  } else {
    res.status(500).send("Internal server error");
  }
};

router.use(verifyRole);

router.get("/grievance/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id, status: "P" } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      res.send(grievance);
    })
    .catch(err => {
      res.status(400).send();
    });
}); //GET retrieve grievance for principal '/principal/grievance/:id'

router.get("/grievances/:status", (req, res) => {
  var isClosed = req.params.status;
  if (!(isClosed === "false" || isClosed === "true")) {
    return res.status(404).send();
  }
  where =
    isClosed === "false"
      ? {
          isClosed: 0,
          status: "P"
        }
      : {
          isClosed: 1,
          status: "P",
          closedBy: "P"
        };
  var dateSortFactor = isClosed === "false" ? "createdAt" : "updatedAt";
  Grievance.findAll({
    where
  })
    .then(grievances => {
      res.send(grievances);
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //GET retrieve grievances for principal according to status '/principal/grievances/:status'

router.patch("/grievance/close/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send({
      errorMessage: "id should be an integer"
    });
  }
  var body = {};
  if (!(_.isBoolean(req.body.isClosed) || req.body.isClosed === true)) {
    res.status(400).send();
  }
  if (req.body.isClosed) {
    body.isClosed = true;
    body.closedBy = "P";
  }
  Grievance.findOne({
    where: {
      id,
      status: "P",
      isClosed: false
    }
  })
    .then(grievance => {
      Grievance.update(body, {
        where: {
          id: grievance.id
        }
      })
        .then(patch => {
          res.send(body);
        })
        .catch(err => {
          res.status(400).send({ errorMessage: err });
        });
    })
    .catch(err => {
      res.status(400).send({ errorMessage: err });
    });
}); //PATCH close grievance for principal '/principal/grievance/close/:status'

router.patch("/grievance/escalate/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send({
      errorMessage: "id should be an integer"
    });
  }
  if (!(_.isString(req.body.status) && req.body.status === "O")) res.send(400);
  var body = {};
  body.status = req.body.status;
  Grievance.findByPk(id)
    .then(grievance => {
      if (grievance.isClosed === true || grievance.status !== "P") {
        return res.status(400).send();
      } else {
        if (body.status === "O") body.timeTillEscalation = grievance.time3;
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
}); //PATCH escalate grievance for principal '/principal/grievance/close/:status'

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
}); //POST create grievance log for principal '/principal/grievancelog'

router.get("/grievancelog/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id, status: "P" } })
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
}); //GET retrieve grievance log for principal '/principal/grievancelog/:id'

router.post("/user", (req, res) => {
  const body = _.pick(req.body, ["id", "name", "dob", "email", "phone", "sex"]);
  User.sync()
    .then(() => {
      return User.create({
        id: req.body.id,
        name: req.body.name,
        password: "qpalzmqp",
        dob: req.body.dob,
        email: req.body.email,
        isStudent: true,
        phone: req.body.phone,
        sex: req.body.sex,
        role: "S"
      });
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
}); //POST create student for principal '/principal/user'

module.exports = router;
