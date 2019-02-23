const express = require("express");

const appRoutes = require("./app");
const { authenticate } = require("../helpers/auth");

const committeeMemberRoutes = require("./committeeMember");
const ombudsmanRoutes = require("./ombudsman");
const onFieldPersonnelRoutes = require("./onFieldPersonnel");
const principalRoutes = require("./principal");
const studentRoutes = require("./student");

const router = express.Router();

router.use(appRoutes);

router.use(authenticate);
router.use("/committeemember", committeeMemberRoutes);
router.use("/ombudsman", ombudsmanRoutes);
router.use("/onfieldpersonnel", onFieldPersonnelRoutes);
router.use("/principal", principalRoutes);
router.use("/student", studentRoutes);

module.exports = router;
