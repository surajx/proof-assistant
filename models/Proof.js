var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proofSchema = new Schema({
  email: { type: Schema.Types.ObjectId, ref: 'User' },
  proofData: { type: Object }
});

var Proof = mongoose.model('Proof', proofSchema);

module.exports = Proof;
