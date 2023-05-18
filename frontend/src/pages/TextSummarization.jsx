import { Box } from "@mui/material";
import React, { useCallback } from "react";
import PageHeader from "../components/page-headers/PageHeader";
import DropZone from "../components/dropzone/DropZone";
import TextResultArea from "../components/reslutArea/TextResultArea";
import { useSummarizeTextMutation } from "../redux/convert/AllApi";

function TextSummarization() {
  const accept = {
    "text/*": [],
  };
  const [summarizeText, { data, isLoading }] = useSummarizeTextMutation();

  const handelSubmit = useCallback(
    (files) => {
      if (files) {
        const formData = new FormData();
        formData.append("file", files?.[0]);
        summarizeText(formData)
          .unwrap()
          .then((e) => console.log(e))
          .catch((e) => console.log(e));
      }
    },
    [summarizeText]
  );

  return (
    <Box sx={{ padding: "20px 10px" }}>
      <PageHeader
        title="Text Summarization"
        subTitle="The Summarization Tool summarizes text in two ways: by pasting the text or by uploading an image. The resulting summary is concise and easy to read, making it perfect for quickly extracting important information."
      />
      <DropZone
        accept={accept}
        btnText="Summarize"
        handelSubmit={handelSubmit}
      />
      <TextResultArea data={data?.output} loading={isLoading} />
    </Box>
  );
}

export default TextSummarization;
