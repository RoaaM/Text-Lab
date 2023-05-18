import React from "react";
import { styled } from "@mui/material/styles";
import { Box, CircularProgress, Typography } from "@mui/material";

const ResultTextWrapper = styled(Box)(({ theme }) => ({
  background: "rgb(250, 250, 250)",
  border: "1px dashed",
  padding: "10px 20px",
  borderColor: "rgba(194,205,218,1)",
  margin: "30px 0",
  minHeight: "30vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function AudioResult({ data, loading }) {
  return (
    <ResultTextWrapper>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : data ? (
        <audio controls>
          <source src={data?.audio} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Result will apear hear
        </Typography>
      )}
    </ResultTextWrapper>
  );
}

export default AudioResult;
