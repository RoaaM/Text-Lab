import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Card1({ item }) {
  return (
    <Card
      elevation={6}
      component={Link}
      to={item.url}
      sx={{
        display: "flex",
        background:
          "linear-gradient(0deg, rgba(196,212,244,0.8393732492997199) 0%, rgba(255,255,255,1) 25%)",
        borderRadius: "50px",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          background: "#8553eb",
          width: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        alt="Live from space album cover"
      >
        <img
          alt={item.name}
          src={item.image}
          width={80}
          height={80}
          objectFit="cover"
        />
      </CardMedia>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 4,
          width: "100%",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.subTitle}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
