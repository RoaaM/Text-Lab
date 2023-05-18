import { Container, Paper } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import TextExtraction from "./pages/TextExtraction";
import { styled } from "@mui/material/styles";
import TextSummarization from "./pages/TextSummarization";
import VideoToText from "./pages/VideoToText";
import AudioToText from "./pages/AudioToText";
import TextToSpeech from "./pages/TextToSpeech";
import Home from "./pages/Home";

const ContainerStyle = styled(Container)(({ theme }) => ({
  background: "#fff",
  paddingBottom: "20px",
  [theme.breakpoints.up("md")]: {
    borderRadius: "70px",
    paddingTop: "20px",
  },
}));

const MainStyle = styled(Paper)(({ theme }) => ({
  minHeight: "100vh",
  [theme.breakpoints.up("md")]: {
    padding: "50px 0",
  },
}));

function App() {
  return (
    <>
      <Navbar />
      <MainStyle sx={{}} elevation={0} square className="App">
        <ContainerStyle>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/text_extraction" element={<TextExtraction />} />
            <Route path="/text_summarization" element={<TextSummarization />} />
            <Route path="/video_to_text" element={<VideoToText />} />
            <Route path="/audio_to_text" element={<AudioToText />} />
            <Route path="/text_to_speech" element={<TextToSpeech />} />
          </Routes>
        </ContainerStyle>
      </MainStyle>
    </>
  );
}

export default App;
