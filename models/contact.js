const { HttpError } = require('../helpers/HttpError');

const contactSchema = new Schema(
    {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
        },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  }, {versionKey: false}
)

contactSchema.post('save', HttpError)

const Contact = model('contact', contactSchema)

module.exports = Contact