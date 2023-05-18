import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const ParagraphStyle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));
// fontFamily: "Times New Roman, Times, serif",
function PageHeader({ title, subTitle }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        fontFamily="Times New Roman, Times, serif"
        variant="h2"
        fontWeight="bold"
      >
        {title}
      </Typography>
      <ParagraphStyle variant="subtitle1" color="text.secondary">
        {subTitle}
      </ParagraphStyle>
    </Box>
  );
}

export default PageHeader;
