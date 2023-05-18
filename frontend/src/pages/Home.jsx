import React from "react";
import Card1 from "../components/card/Card";

import VideoFile from "../assets/images/video-file.png";
import VoiceMessage from "../assets/images/voice-message.png";
import File from "../assets/images/file.png";
import AudioFile from "../assets/images/audio-file.png";
import Converter from "../assets/images/converter.png";
import { Grid } from "@mui/material";

const pages = [
  {
    name: "Text Extraction",
    url: "/text_extraction",
    image: Converter,
    subTitle: "Extract any Text from your image.",
  },
  {
    name: "Text Summarization",
    url: "/text_summarization",
    image: File,
    subTitle:
      "Summarize any text in a short and easy to understand paragraph.Text Summarizer",
  },
  {
    image: VideoFile,
    name: "Video to Text",
    url: "/video_to_text",
    subTitle: "Upload your file to transcribe your voice into text in seconds.",
  },
  {
    name: "Audio to Text",
    url: "/audio_to_text",
    image: VoiceMessage,
    subTitle: "Upload your Video or URL to convert it into text in seconds.",
  },
  {
    name: "Text to Speech",
    url: "/text_to_speech",
    image: AudioFile,
    subTitle: "Upload your file to convert it into Speech in seconds.",
  },
];

function Home() {
  return (
    <div>
      <Grid container spacing={5} justifyContent="center">
        {pages.map((page) => (
          <Grid item md={6}>
            <Card1 item={page} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
