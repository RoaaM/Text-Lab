import { Box } from "@mui/material";
import React, { useCallback } from "react";
import PageHeader from "../components/page-headers/PageHeader";
import DropZone from "../components/dropzone/DropZone";
import TextResultArea from "../components/reslutArea/TextResultArea";
import { useVideoToTextMutation } from "../redux/convert/AllApi";

function VideoToText() {
  const accept = {
    "video/*": [],
  };

  const [videoToText, { data, isLoading }] = useVideoToTextMutation();

  const handelSubmit = useCallback(
    (files) => {
      if (files) {
        const formData = new FormData();
        formData.append("video", files?.[0]);
        videoToText(formData)
          .unwrap()
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }
    },
    [videoToText]
  );
  return (
    <Box sx={{ padding: "20px 10px" }}>
      <PageHeader
        title="Video To Text"
        subTitle="The Video-to-Text Converter tool accurately transcribes spoken words from videos into written text.
                  Upload your video and let the tool automatically generate a transcript. Edit the text as needed and 
                  export it in various formats. Save time and effort by quickly extracting valuable information from your videos."
      />

      <DropZone
        accept={accept}
        btnText="Extract Text"
        handelSubmit={handelSubmit}
      />
      <TextResultArea data={data?.output} loading={isLoading} />
    </Box>
  );
}

export default VideoToText;
