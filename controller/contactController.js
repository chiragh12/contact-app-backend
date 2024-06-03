const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const express = require("express");
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log("Get All contacts");
  res.status(200).json(contacts);
});
//@desc Create Contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("Contact Created");
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    res.status(404).json({ message: "All fills are mandatory" });
  }
  const contacts = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contacts);
});
//@desc Get Contact by ID
//@route GET /api/contacts:id
//@access private

const getContactByID = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.findById(req.params.id && req.user.id);
    if (!contacts) {
      console.log(!contacts);
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    console.log("Got Contact");
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
});

//@desc Update Contact by ID
//@route PUT /api/contacts:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    if (contacts.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User cannot update the contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Contact Updated");
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
});
//@desc Delete Contact by ID
//@route DELETE /api/contacts:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User cannot update the contacts");
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    console.log("Contact Deleted:", deletedContact);
    res.status(200).json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getContact,
  createContact,
  getContactByID,
  updateContact,
  deleteContact,
};
