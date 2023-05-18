import { Box } from "@mui/material";
import React, { useCallback } from "react";
import PageHeader from "../components/page-headers/PageHeader";
import DropZone from "../components/dropzone/DropZone";
import TextResultArea from "../components/reslutArea/TextResultArea";
import { useAudioToTextMutation } from "../redux/convert/AllApi";

function AudioToText() {
  const accept = {
    "audio/*": [],
  };
  const [sendAudioFile, { data, isLoading }] = useAudioToTextMutation();
  const handelSubmit = useCallback(
    (files) => {
      if (files) {
        const formData = new FormData();
        formData.append("audio_file", files?.[0]);
        sendAudioFile(formData)
          .unwrap()
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }
    },
    [sendAudioFile]
  );
  return (
    <Box sx={{ padding: "20px 10px" }}>
      <PageHeader
        title="Audio To Text"
        subTitle="The Audio-to-Text Converter quickly transcribes spoken words from audio files into written text.
                  Just upload your file and copy the transcription with one click."
      />

      <DropZone accept={accept} btnText="Convert" handelSubmit={handelSubmit} />
      <TextResultArea data={data?.output} loading={isLoading} />
    </Box>
  );
}

export default AudioToText;
