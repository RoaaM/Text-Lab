import { Box, Button, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import DropIcon from "../../assets/images/dragicon.png";

const baseStyle = {
  flex: 1,
  margin: "40px auto",
  width: "80%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function DropZone({ btnText, accept, handelSubmit }) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <Box sx={{ boxShadow: 8 }} {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img alt="darg icon" src={DropIcon} />
        <Typography sx={{ my: 2, fontWeight: "bold" }} component="div">
          Drag & Drop to Upload File
        </Typography>
        <Typography sx={{ mb: 1, fontWeight: "bold" }}>OR</Typography>
        <Button sx={{ mb: 2 }} variant="contained" color="secondary">
          Upload File
        </Button>
        {acceptedFiles && acceptedFileItems}
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Button
          onClick={() => handelSubmit(acceptedFiles)}
          color="secondary"
          variant="contained"
          sx={{ m: "auto" }}
        >
          {btnText}
        </Button>
      </Box>
      <aside>
        {fileRejections.length > 0 && (
          <>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
      </aside>
    </section>
  );
}
