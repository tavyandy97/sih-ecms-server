const User = require("../../models/user");
const Grievance = require("../../models/grievance");
const SubCategory = require("../../models/subcategory");
const GrievanceLog = require("../../models/grievanceLog");

const express = require("express");
const _ = require("lodash");

const router = express.Router();

const verifyRole = (req, res, next) => {
  if (req && req.user && req.user.role) {
    if (req.user.role === "C") {
      next();
    } else {
      res.status(403).send({ errorMessage: "Not right role" });
    }
  } else {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

router.use(verifyRole);

router.get("/grievance/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id, status: "C" } })
    .then(grievance => {
      if (!grievance) {
        return res.status(404).send();
      }
      res.send(grievance);
    })
    .catch(err => {
      res.status(400).send();
    });
}); //GET retrieve grievance for committeemembers '/committeemember/grievance/:id'

router.get("/grievances/:status", (req, res) => {
  var isClosed = req.params.status;
  if (!(isClosed === "false" || isClosed === "true")) {
    return res.status(404).send();
  }
  where =
    isClosed === "false"
      ? {
          isClosed: 0,
          status: "C"
        }
      : {
          isClosed: 1,
          status: "C",
          closedBy: "C"
        };
  var dateSortFactor = isClosed === "false" ? "createdAt" : "updatedAt";
  User.findByPk(req.user.id)
    .then(user => {
      var categoryId = user.categoryId;
      Grievance.findAll({
        where,
        include: [
          {
            model: SubCategory,
            where: {
              categoryId
            }
          }
        ]
      })
        .then(grievances => {
          res.send(grievances);
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    })
    .catch(err => {
      res.status(404).send({
        errorMessage: err
      });
    });
}); //GET retrieve grievances for committeemembers according to status '/committeemember/grievances/:status'

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
    body.closedBy = "C";
  }
  Grievance.findOne({
    where: {
      id,
      status: "C"
    },
    include: [
      {
        model: SubCategory
      }
    ]
  })
    .then(grievance => {
      if (grievance.status === "C" && grievance.isClosed === false) {
        User.findByPk(req.user.id)
          .then(user => {
            if (user.categoryId === grievance.subcategory.categoryId) {
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
            } else {
              res.status(404).send();
            }
          })
          .catch(err => {
            res.status(404).send();
          });
      } else {
        res.status(400).send();
      }
    })
    .catch(err => {
      res.status(400).send({ errorMessage: err });
    });
}); //PATCH close grievance for committeemembers '/committeemember/grievance/close/:status'

router.patch("/grievance/escalate/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send({
      errorMessage: "id should be an integer"
    });
  }
  if (
    !(
      _.isString(req.body.status) &&
      (req.body.status === "P" || req.body.status === "F")
    )
  )
    res.send(400);
  var body = {};
  body.status = req.body.status;
  Grievance.findByPk(id)
    .then(grievance => {
      if (grievance.isClosed === 1 || grievance.status !== "C") {
        res.status(400).send();
      } else {
        if (body.status === "P") body.timeTillEscalation = grievance.time2;
        else if (body.status === "F")
          body.timeTillEscalation = grievance.timeOF;
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
}); //PATCH escalate grievance for committeemembers '/committeemember/grievance/close/:status'

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
}); //POST create grievance log for committeemembers '/committeemember/grievancelog'

router.get("/grievancelog/:id", (req, res) => {
  var id = req.params.id;
  if (_.isInteger(id)) {
    return res.status(404).send();
  }
  Grievance.findOne({ where: { id, status: "C" } })
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
}); //GET retrieve grievance log for committeemembers '/committeemember/grievancelog/:id'

module.exports = router;
