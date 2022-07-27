import { Request, Response } from "express";
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const cors = require('cors');

app.use(cors());

app.get(("/video"), async (req: Request, res: Response) => {
  const { url } = req.query;
  let info = await ytdl.getInfo(url);
  //console.log(info)
  const videoSize = info.videoDetails.lengthSeconds

  if (videoSize < 800) {
    res.header("Content-Disposition", `attachmentt; filename="${info.videoDetails.title}.mp4"`);
    return ytdl(url).pipe(res)
  } return res.status(403).json({ error: 'Unable to download' });

});

app.listen(3001, () => console.log('Server listening on port http://localhost:3001'));
