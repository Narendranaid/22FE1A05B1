import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { logMiddleware } from "../logging-middleware/loginMiddleware";

export default function UrlShortenerPage({ urls, saveUrls }) {
  const [inputs, setInputs] = useState([{ longUrl: "", validity: "", shortcode: "" }]);

  const handleChange = (i, field, value) => {
    const updated = [...inputs];
    updated[i][field] = value;
    setInputs(updated);
  };

  const addRow = () => {
    if (inputs.length < 5) setInputs([...inputs, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const shorten = () => {
    const newUrls = [...urls];
    inputs.forEach((inp) => {
      if (!inp.longUrl) return;
      try {
        new URL(inp.longUrl); // validation
        const code = inp.shortcode || Math.random().toString(36).substr(2, 6);
        if (newUrls.find((u) => u.shortcode === code)) throw new Error("Shortcode exists");
        const mins = parseInt(inp.validity) || 30;
        const expiresAt = new Date(Date.now() + mins * 60000);
        newUrls.push({
          longUrl: inp.longUrl,
          shortcode: code,
          createdAt: new Date().toISOString(),
          expiresAt: expiresAt.toISOString(),
          clicks: 0,
          clickData: []
        });
        logMiddleware("info", `Shortened ${inp.longUrl} -> ${code}`);
      } catch (e) {
        logMiddleware("error", e.message);
        alert(e.message);
      }
    });
    saveUrls(newUrls);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Shorten URLs</Typography>
      {inputs.map((inp, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Long URL" value={inp.longUrl} onChange={(e) => handleChange(i, "longUrl", e.target.value)} />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField fullWidth label="Validity (min)" value={inp.validity} onChange={(e) => handleChange(i, "validity", e.target.value)} />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField fullWidth label="Shortcode" value={inp.shortcode} onChange={(e) => handleChange(i, "shortcode", e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addRow} sx={{ mr: 2 }}>+ Add</Button>
      <Button variant="contained" onClick={shorten}>Shorten</Button>
    </Paper>
  );
}
