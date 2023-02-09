const mongodb = require("../databases/connect")
const ObjectId = require("mongodb").ObjectId
const {validationResult} = require("express-validator")


const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("Contacts").find()
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res) => {
	const userId = new ObjectId(req.params.id)
	const result = await mongodb
		.getDb()
		.db()
		.collection("Contacts")
		.find({ _id: userId })
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists[0])
	})
}

const addContact =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday
	  };
	  const response = await mongodb.getDb().db().collection('Contacts').insertOne(contact);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the contact.');
	  }
	};

const updateContact =async(req, res) =>{
	const userId = new ObjectId(req.params.id);
	const contact = {
	  firstName: req.body.firstName,
	  lastName: req.body.lastName,
	  email: req.body.email,
	  favoriteColor: req.body.favoriteColor,
	  birthday: req.body.birthday
	};
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('Contacts')
	  .replaceOne({ _id: userId }, contact);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the contact.');
	}
  };

const deleteContact =async(req, res) => {
	const userId = new ObjectId(req.params.id);
	const response = await mongodb.getDb().db().collection('Contacts').remove({ _id: userId }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
	}
  };


module.exports = {getAll, getSingle, addContact, deleteContact, updateContact}