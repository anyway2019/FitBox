import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ReadOnlyCard({ title, value, unit, ...rest }) {
  return (
    <Card sx={{ minWidth: 225 }} {...rest}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {title || "Card Title"}
        </Typography>
        <Typography variant="h4" component="div">
          {value || 0}
        </Typography>
        <Typography component="div">{unit || ""}</Typography>
      </CardContent>
    </Card>
  );
}
