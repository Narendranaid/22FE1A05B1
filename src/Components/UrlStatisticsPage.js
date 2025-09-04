import React from "react";
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function UrlStatisticsPage({ urls }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((u, i) => (
            <TableRow key={i}>
              <TableCell><a href={`/${u.shortcode}`} target="_blank" rel="noreferrer">{u.shortcode}</a></TableCell>
              <TableCell>{u.longUrl}</TableCell>
              <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
              <TableCell>{u.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
