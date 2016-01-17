var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proofSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  proofStatus: {type: Object, required: true},
  proofName: {type: String, required: true},
  proofData: { type: Object },
  isDeleted: { type: Boolean, default: false}
});

var Proof = mongoose.model('Proof', proofSchema);

module.exports = Proof;
