const express = require("express");
const {
  createContact,
  getContact,
  getContactByID,
  updateContact,
  deleteContact,
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken)
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactByID).put(updateContact).delete(deleteContact);
module.exports = router;
