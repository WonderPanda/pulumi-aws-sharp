import * as cloud from '@pulumi/cloud';
import axios from 'axios';
import express from 'express';
import sharp from 'sharp';

export const makeApp = () => {
  const app = express();
  
  app.get('*', async (req, res) => {
    const response = await axios.get(
      'https://en.wikipedia.org/wiki/Tiger#/media/File:Royal_Bengal_Tiger_at_Kanha_National_Park.jpg',
      {
        responseType: 'arraybuffer'
      }
    );
  
    const imageBuffer = Buffer.from(response.data, 'binary');
    
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
}

const server = new cloud.HttpServer('sharp-test', () => {
  return makeApp();
});

exports.endpoint = server.url;
