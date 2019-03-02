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

router.post("/test", (req, res) => {
  axios
    .get("https://some-random-api.ml/meme")
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

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
                errorMessage: "Error in elec"
              });
            });
        })
        .catch(err => {
          res.status(400).send({
            errorMessage: "Error in griev"
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
    "externalexpert"
  ]);
  axios.post(
    `${process.env.ML_HOST}/furniture/`,
    {
      Parts: body.partsneeded,
      Quantity: body.quantity,
      Availability: body.availability,
      Need: body.externalexpert
    },
    { headers: { "Ocp-Apim-Subscription-Key": process.env.ML_API } }
  );
});

module.exports = router;
