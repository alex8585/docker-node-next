import React from "react"
import Typography from "@material-ui/core/Typography"
//import Link from "@material-ui/core/Link"
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <span>Alex85 Portfolio</span> {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Copyright
