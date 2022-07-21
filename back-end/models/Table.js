const mongoose = require("mongoose");
const PointSchema = require("./Point");
const Schema = mongoose.Schema;

// Create Schema
const TableSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  location_name: {
    type: String,
    required: true
  },
  street_address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: false,
    min: 5,
    max: 5
  },
  location_within_building: {
    type: String,
    required: false
  },
  restroom_type: {
    type: String,
    enum: ['men', 'women', 'family', 'other'],
    required: false
  },
  coordinate_location: {
    type: "Point",
    coordinates: [x1, y1],
    required: false
  },
  table_style: {
    type: String,
    enum: ['fixed-height', 'adjustable', 'portable'],
    required: false
  },
  table_notes: {
    type: String,
   
    required: false
  },
  publicly_accessible: {
    type: Boolean,
    required: false
  },
  operating_hours: {
    type: String,
    required: false
  },
  contact_phone: {
    type: String,
    required: false
  },
  contact_email: {
    type: String,
    required: false
  },
  additional_information: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'deleted', 'reported'],
    default: 'submitted',
    required: true
  } 
});

module.exports = Table = mongoose.model("tables", TableSchema);