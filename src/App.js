import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import UrlShortenerPage from "./Components/UrlShortenerPage";
import UrlStatisticsPage from "./Components/UrlStatisticsPage";
import { logMiddleware } from "./logging-middleware/loginMiddleware";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import "./App.css";

function RedirectHandler({ urls }) {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = urls.find((u) => u.shortcode === code);
    if (entry) {
      logMiddleware("info", `Redirecting ${code} -> ${entry.longUrl}`);
      window.location.href = entry.longUrl;
    } else {
      navigate("/");
    }
  }, [code, urls, navigate]);

  return null;
}

export default function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(saved);
  }, []);

  const saveUrls = (newUrls) => {
    setUrls(newUrls);
    localStorage.setItem("urls", JSON.stringify(newUrls));
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UrlShortenerPage urls={urls} saveUrls={saveUrls} />} />
          <Route path="/stats" element={<UrlStatisticsPage urls={urls} />} />
          <Route path="/:code" element={<RedirectHandler urls={urls} />} />
        </Routes>
      </Container>
    </Router>
  );
}
