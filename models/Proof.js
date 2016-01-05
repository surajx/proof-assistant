var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proofSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  proofStatus: {type: Boolean, required: true},
  proofName: {type: String, required: true},
  proofData: { type: Object },
  proofGoal: { type: String }
});

var Proof = mongoose.model('Proof', proofSchema);

module.exports = Proof;
