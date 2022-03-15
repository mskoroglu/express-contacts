const express = require("express");
const router = express.Router();
const { BASE_URL } = require("../config/constants");
const ContactService = require("../lib/ContactService");

const contactService = new ContactService();

// Get & search contacts
router.get("/", async function (req, res) {
  const { term } = req.query;
  const contacts = await contactService.search(req.userId, term);
  res.json(contacts);
});

// Create a new contact
router.post("/", async function (req, res) {
  const contact = await contactService.create({
    ...req.body,
    userId: req.userId,
  });
  res
    .status(201)
    .setHeader("Location", `${BASE_URL}/contacts/${contact.id}`)
    .end();
});

// Get contact detail
router.get("/:id", async function (req, res) {
  try {
    const contact = await contactService.findById(req.userId, req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(403).json(error);
  }
});

// Update contact
router.put("/:id", async function (req, res) {
  try {
    const { userId } = await contactService.findById(req.userId, req.params.id);
    await contactService.update({ ...req.body, id: req.params.id, userId });
    res.status(204).end();
  } catch (error) {
    res.status(403).json(error);
  }
});

// Delete contact
router.delete("/:id", async function (req, res) {
  try {
    const contact = await contactService.findById(req.userId, req.params.id);
    await contactService.delete(contact);
    res.status(204).end();
  } catch (error) {
    res.status(403).json(error);
  }
});

module.exports = router;
