import { Box, Button, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../components/page-headers/PageHeader";
import Image from "../assets/images/speech_select.png";
import { styled } from "@mui/material/styles";
import { useTextToAudioMutation } from "../redux/convert/AllApi";
import AudioResult from "../components/reslutArea/AudoResult";

const TextAreaStyle = styled("textarea")(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: "#fff",
  border: "none",
  borderRadius: "70px",
  resize: "none",
  padding: "40px",
  fontWeight: "bold",
  fontSize: "18px",
  wordSpacing: 2,
  color: "gray",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "90%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
function TexttoSpeech() {
  const [text, setText] = useState("");
  const [textToSpeech, { data, isLoading }] = useTextToAudioMutation();

  const onSubmit = () => {
    if (text) {
      const formData = new FormData();
      formData.append("text", text);
      textToSpeech(formData)
        .unwrap()
        .then((e) => console.log(e))
        .catch((e) => console.log(e));
    }
  };
  return (
    <Box sx={{ padding: "20px 10px" }}>
      <PageHeader
        title="Text To Speech"
        subTitle="The Text-to-Audio Converter tool swiftly converts written text into spoken words. Upload your text, choose a voice and language, and click to generate an audio file. Listen to the audio or download it for later use."
      />
      <Paper elevation={0} sx={{ my: 4, paddingY: 3 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item md={6} sm={12}>
              <TextAreaStyle
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type Your Text Here..."
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <ImageWrapper>
                <img alt="speech voice" src={Image} />
              </ImageWrapper>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={onSubmit} color="secondary" variant="contained">
                Convert
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AudioResult data={data} loading={isLoading} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}

export default TexttoSpeech;
