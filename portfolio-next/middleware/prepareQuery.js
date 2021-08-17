const prepareQuery = () => (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 20
  const page = parseInt(req.query.page) || 1
  const direction = req.query.direction
  const sort = req.query.sort
  const filterString = req.query.filter
  //console.log(perPage);
  const sortObj = {}
  if (direction && sort) {
    if (direction == "ASC") {
      sortObj[sort] = 1
    } else {
      sortObj[sort] = -1
    }
  } else {
    sortObj["order_number"] = 1
  }

  const filterObj = {}
  if (filterString) {
    const filter = JSON.parse(req.query.filter)
    const q = filter.q
    if (!q) {
      if (filter.user) {
        filterObj.user = filter.user
      }

      for (const property in filter) {
        const val = filter[property]

        if (property == "tags") {
          let tagsFilter = val.split(",")
          filterObj["tags"] = { $in: tagsFilter }
        }

        if (
          property == "tags" ||
          property == "userId" ||
          property == "user" ||
          q
        )
          continue

        filterObj[property] = { $regex: `${val}`, $options: "i" }
      }
    } else {
      filterObj.$or = [
        { name: { $regex: `${q}`, $options: "i" } },
        { brand: { $regex: `${q}`, $options: "i" } },
        { category: { $regex: `${q}`, $options: "i" } },
        { description: { $regex: `${q}`, $options: "i" } },
      ]
    }
  }
  //console.log(filterObj)
  req.mongoParams = {
    skip: perPage * (page - 1),
    perPage,
    sortObj,
    filterObj,
    page,
  }

  next()
}

export default prepareQuery
