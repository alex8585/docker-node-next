import mongoose from "mongoose"
mongoose.Promise = global.Promise

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    order_number: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tagSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

tagSchema.virtual("createdTs").get(function () {
  return this.createdAt.getTime()
})

export { tagSchema }

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema)

export default Tag
