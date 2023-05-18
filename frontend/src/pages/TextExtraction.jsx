import React, { useCallback } from "react";
import PageHeader from "../components/page-headers/PageHeader";
import { Box, Paper } from "@mui/material";
import DropZone from "../components/dropzone/DropZone";
import TextResultArea from "../components/reslutArea/TextResultArea";
import { useTextExtractionMutation } from "../redux/convert/AllApi";

function TextExtraction() {
  const accept = {
    "image/jpeg": [],
    "image/png": [],
  };
  const [sendTextExtraction, { data, isLoading }] = useTextExtractionMutation();

  const handelSubmit = useCallback(
    (files) => {
      if (files) {
        const formData = new FormData();
        formData.append("image", files?.[0]);
        sendTextExtraction(formData)
          .unwrap()
          .then((e) => console.log(e))
          .catch((e) => console.log("error", e));
      }
    },
    [sendTextExtraction]
  );
  return (
    <Box sx={{ padding: "20px 10px" }}>
      <PageHeader
        title="Text Extraction"
        subTitle="The Text Extractor tool can extract text from any image by simply
        uploading the image. The tool automatically pulls the text from the
        image and allows you to copy the extracted text to your clipboard with
        just one click."
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

export default TextExtraction;
