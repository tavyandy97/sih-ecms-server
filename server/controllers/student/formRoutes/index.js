const Electricity = require("../../../models/formModels/electricity");
const Fee_payment = require("../../../models/formModels/fee_payment");
const Furniture = require("../../../models/formModels/furniture");
const Messfee = require("../../../models/formModels/messfee");
const Portal_related_issue = require("../../../models/formModels/portal_related_issue");
const Road = require("../../../models/formModels/Road");
const Scholarship_reimbursement = require("../../../models/formModels/scholarship_reimbursement");
const Sports_material = require("../../../models/formModels/Sports_material");
const Watersupply = require("../../../models/formModels/watersupply");
const Wifi = require("../../../models/formModels/wifi");

const Grievance = require("../../../models/grievance");

const express = require("express");
const _ = require("lodash");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

router.post("/electricity", (req, res) => {
  var body = _.pick(req.body, [
    "grievance_description",
    "grievence_subject",
    "issue",
    "quantity",
    "availability",
    "time",
    "externalexpert",
    "subcategoryId"
  ]);
  axios
    .post(
      `${process.env.ML_HOST}/electricity/`,
      {
        Issue: body.issue,
        Quantity: body.quantity,
        Availability: body.availability,
        Need: body.externalexpert
      },
      { headers: { "Ocp-Apim-Subscription-Key": process.env.ML_API } }
    )
    .then(response => {
      const data = response.data;
      Grievance.sync()
        .then(() => {
          Grievance.create({
            subject: body.grievence_subject,
            status: "C",
            timeTillEscalation: data.time1,
            time1: data.time1,
            time2: data.time2,
            time3: data.time3,
            timeOF: data.timeOF,
            userId: req.user.id,
            subcategoryId: body.subcategoryId
          });
        })
        .then(grievance => {
          Electricity.sync()
            .then(() => {
              Electricity.create({
                grievance_description: body.grievance_description,
                grievence_subject: body.grievence_subject,
                partsneeded: body.partsneeded,
                issue: body.issue,
                quantity: body.quantity,
                availability: body.availability,
                time: body.time,
                externalexpert: body.externalexpert,
                time1: data.time1,
                time2: data.time2,
                time3: data.time3,
                timeOF: data.timeOF
              });
            })
            .then(electricity => {
              res.send(electricity);
            })
            .catch(err => {
              res.status(400).send({
                errorMessage: err
              });
            });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
});

router.post("/fee_payment", (req, res) => {
  var body = _.pick(req.body, [
    "grievance_description",
    "grievence_subject",
    "bank",
    "account_number",
    "current_status",
    "transaction_number",
    "date_of_transaction",
    "mode_of_transaction",
    "attached_documents",
    "subcategoryId"
  ]);
  axios
    .post(
      `${process.env.ML_HOST}/feepay/`,
      {
        Status: body.current_status,
        Mode: body.mode_of_transaction,
        Bank: body.bank
      },
      { headers: { "Ocp-Apim-Subscription-Key": process.env.ML_API } }
    )
    .then(response => {
      const data = response.data;
      Grievance.sync()
        .then(() => {
          Grievance.create({
            subject: body.grievence_subject,
            status: "C",
            timeTillEscalation: data.time1,
            time1: data.time1,
            time2: data.time2,
            time3: data.time3,
            timeOF: data.timeOF,
            userId: req.user.id,
            subcategoryId: body.subcategoryId
          });
        })
        .then(grievance => {
          console.log(grievance);
          Fee_payment.sync()
            .then(() => {
              Fee_payment.create({
                grievance_description: body.grievance_description,
                grievence_subject: body.grievence_subject,
                bank: body.bank,
                account_number: body.account_number,
                current_status: body.current_status,
                transaction_number: body.transaction_number,
                date_of_transaction: body.date_of_transaction,
                mode_of_transaction: body.mode_of_transaction,
                attached_documents: body.attached_documents,
                time1: data.time1,
                time2: data.time2,
                time3: data.time3,
                timeOF: data.timeOF
              });
            })
            .then(fee_payment => {
              res.send(fee_payment);
            })
            .catch(err => {
              res.status(400).send({
                errorMessage: err
              });
            });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
});

router.post("/furniture", (req, res) => {
  var body = _.pick(req.body, [
    "grievance_description",
    "grievence_subject",
    "partsneeded",
    "quantity",
    "availability",
    "time",
    "externalexpert",
    "subcategoryId"
  ]);
  axios
    .post(
      `${process.env.ML_HOST}/furniture/`,
      {
        Parts: body.partsneeded,
        Quantity: body.quantity,
        Availability: body.availability,
        Need: body.externalexpert
      },
      { headers: { "Ocp-Apim-Subscription-Key": process.env.ML_API } }
    )
    .then(response => {
      const data = response.data;
      Grievance.sync()
        .then(() => {
          Grievance.create({
            subject: body.grievence_subject,
            status: "C",
            timeTillEscalation: data.time1,
            time1: data.time1,
            time2: data.time2,
            time3: data.time3,
            timeOF: data.timeOF,
            userId: req.user.id,
            subcategoryId: body.subcategoryId
          });
        })
        .then(grievance => {
          Furniture.sync()
            .then(() => {
              Furniture.create({
                grievance_description: body.grievance_description,
                grievence_subject: body.grievence_subject,
                partsneeded: body.partsneeded,
                quantity: body.quantity,
                availability: body.availability,
                time: body.time,
                externalexpert: body.externalexpert,
                time1: data.time1,
                time2: data.time2,
                time3: data.time3,
                timeOF: data.timeOF
              });
            })
            .then(electricity => {
              res.send(electricity);
            })
            .catch(err => {
              res.status(400).send({
                errorMessage: err
              });
            });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    });
});

router.post("/messfee", (req, res) => {
  var body = _.pick(req.body, [
    "grievance_description",
    "grievence_subject",
    "bank",
    "account_number",
    "hostel",
    "transaction_number",
    "transactionmode",
    "attached_documents",
    "subcategoryId"
  ]);
  axios
    .post(
      `${process.env.ML_HOST}/mess_fee/`,
      {
        Hostel: body.hostel,
        Mode: body.transactionmode,
        Bank: body.bank
      },
      { headers: { "Ocp-Apim-Subscription-Key": process.env.ML_API } }
    )
    .then(response => {
      const data = response.data;
      Grievance.sync()
        .then(() => {
          console.log(body, data);
          Grievance.create({
            subject: body.grievence_subject,
            status: "C",
            timeTillEscalation: data.time1,
            time1: data.time1,
            time2: data.time2,
            time3: data.time3,
            timeOF: data.timeOF,
            userId: req.user.id,
            subcategoryId: body.subcategoryId
          });
        })
        .then(grievance => {
          Messfee.sync()
            .then(() => {
              Messfee.create({
                grievance_description: body.grievance_description,
                grievence_subject: body.grievence_subject,
                bank: body.bank,
                account_number: body.account_number,
                hostel: body.hostel,
                transaction_number: body.transaction_number,
                transactionmode: body.transactionmode,
                attached_documents: body.attached_documents,
                time1: data.time1,
                time2: data.time2,
                time3: data.time3,
                timeOF: data.timeOF
              });
            })
            .then(messfee => {
              res.send(messfee);
            })
            .catch(err => {
              res.status(400).send({
                errorMessage: err
              });
            });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: err
          });
        });
    })
    .catch(err => {
      res.status(400).send({
        errorMessage: err
      });
    });
});

module.exports = router;
