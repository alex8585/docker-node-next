import mongoose from "mongoose"
const Schema = mongoose.Schema
//import { tagSchema } from "./tagModel.js"

const portfolioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    url: {
      type: String,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    //tags: [tagSchema],
    order_number: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

portfolioSchema.virtual('createdTs').get(function() {
  return this.createdAt.getTime();
})

portfolioSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

portfolioSchema.virtual("fullImg").get(function () {
  if (!this.img) {
    return
  }
  const PORT = process.env.PORT || 5000
  const HOST = process.env.HOST || "http://localhost"
  return `${HOST}:${PORT}/${this.img}`
})


const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema)

export default Portfolio
