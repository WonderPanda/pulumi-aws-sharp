import * as cloud from '@pulumi/cloud';
import axios from 'axios';
import express from 'express';
import sharp from 'sharp';

const server = new cloud.HttpServer('sharp-test', () => {
  const app = express();

  app.get('*', async (req, res) => {
    const response = await axios.get(
      'https://www.nachosandchill.com/static/09a6162cdca653e8ad7f026b8dbaf21b-9a729b3adaa6efa713eb597b7426e641-384f5.webp',
      {
        responseType: 'arraybuffer'
      }
    );

    const imageBuffer = Buffer.from(response.data, 'binary');

    // await sharp(imageBuffer)
    const newBuffer = await sharp(imageBuffer)
      .resize(800, 500)
      .toBuffer();

    res.writeHead(200, {
      'Content-disposition': 'attachment;filename=' + 'test.webp',
      'Content-Length': newBuffer.length
    });
    res.end(newBuffer);
  });

  return app;
});

exports.endpoint = server.url;
