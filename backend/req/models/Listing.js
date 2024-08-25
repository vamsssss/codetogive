const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const ListingSchema = new Schema({
  organization: {
    type: String,
    required: true,
  },
  availableFood: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pax: {
    type: Number,
    required: true,
  },
});

const ListingModel = model('Post', ListingSchema);

module.exports = ListingModel;