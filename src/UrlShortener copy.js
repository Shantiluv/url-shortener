import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleUrlChange = (e) => {
    setLongUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post('https://api.tinyurl.com/create', 
      {
        url: longUrl,
        domain: 'tiny.one'
      }, {
        headers: {
          Authorization: 'Bearer 6mpCe7ai3GmNwKUzZPv2uDJ12vMGv7DO3N5cODrIwdRPUygHP1YYa9cUPg9k', // Replace with your TinyURL API token
          'Content-Type': 'application/json'
        }
      });
      setShortUrl(response.data.data.tiny_url);
      setQrCode(response.data.data.tiny_url);
    } catch (error) {
      console.error('Error shortening the URL', error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div className="container">
      <h1 className="mt-5">URL Shortener</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={handleUrlChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleShortenUrl}>
            Shorten
          </button>
        </div>
      </div>
      {shortUrl && (
        <div>
          <div className="alert alert-success">
            Short URL: <a href={shortUrl}>{shortUrl}</a>
            <button className="btn btn-secondary ml-3" onClick={handleCopyToClipboard}>
              Copy to Clipboard
            </button>
          </div>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
