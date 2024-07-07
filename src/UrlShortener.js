import axios from "axios";
import QRCode from 'qrcode.react';
import React, { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleUrlChange = (e) => {
    setLongUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: longUrl,
          domain: "tiny.one",
        },
        {
          headers: {
            "Authorization": "Bearer 6mpCe7ai3GmNwKUzZPv2uDJ12vMGv7DO3N5cODrIwdRPUygHP1YYa9cUPg9k",
            "Content-Type": "application/json",
          },
        }
      );
      setShortUrl(response.data.data.tiny_url);
      setQrCode(response.data.data.tiny_url);
    } catch (error) {
      console.error("Error shortening the URL", error);
    }
  };


  const message = encodeURIComponent("Check out this awesome site");

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shortUrl}&quote=${message}`,
      "facebook-share-dialog",
      "width=800,height=600"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shortUrl}&text=${message}`,
      "twitter-share-dialog",
      "width=800,height=600"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shortUrl}&summary=${message}`,
      "linkedin-share-dialog",
      "width=800,height=600"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${message}%20${shortUrl}`,
      "whatsapp-share-dialog",
      "width=800,height=600"
    );
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div>
      <header id="header" className="header d-flex align-items-center">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">ShanTiny URL Shortner</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4 d-flex justify-content-between">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <br />
                <h2>Your Lightning Fast Shortner Service</h2>
                <p>
                  Just paste the URL you want to shorten into the field below.
                  With a single click on the "Shorten" button, you can easily
                  copy the shortened URL to your clipboard or share it directly
                  on various platforms - all within a matter of seconds!
                </p>

                <form id="url-form"  className="form-search d-flex align-items-stretch mb-3">
                  <input type="hidden" id="shortened-url" />
                  <input type="text" id="url-input" className="form-control" placeholder="https://yourlongurl.com/that/you/want/to/shorten" value={longUrl} onChange={handleUrlChange} onKeyUp={handleUrlChange} />
                  <button type="button" id="shorten-btn" onClick={handleShortenUrl} className="btn btn-primary">SHORTEN</button>
                </form>

                {shortUrl && (
                  <div>   
                    <div className="alert alert-success">
                      Short URL: <a href={shortUrl}>{shortUrl}</a> &nbsp;
                      <button className="btn btn-secondary ml-3" onClick={handleCopyToClipboard}>Copy to Clipboard</button>
                    </div>
                    <div className="alert alert-success">
                      <QRCode value={qrCode} />
                    </div>
                  </div>
                )}

                {shortUrl && (
                  <div className="alert alert-success gy-4">
                    <div className="row">
                      <div className="col-lg-3 col-6">
                        <div
                          className="stats-item text-center w-100 h-100"
                          style={{ cursor: "pointer" }}
                          onClick={shareToFacebook}
                        >
                          <div className="icon flex-shrink-0">
                            <i
                              className="fa-brands fa-square-facebook"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <p>Facebook</p>
                        </div>
                      </div>

                      <div className="col-lg-3 col-6">
                        <div
                          className="stats-item text-center w-100 h-100"
                          style={{ cursor: "pointer" }}
                          onClick={shareToLinkedIn}
                        >
                          <div className="icon flex-shrink-0">
                            <i
                              className="fa-brands fa-linkedin"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <p>LinkedIn</p>
                        </div>
                      </div>

                      <div className="col-lg-3 col-6">
                        <div
                          className="stats-item text-center w-100 h-100"
                          style={{ cursor: "pointer" }}
                          onClick={shareToTwitter}
                        >
                          <div className="icon flex-shrink-0">
                            <i
                              className="fa-brands fa-x-twitter"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <p>X</p>
                        </div>
                      </div>

                      <div className="col-lg-3 col-6">
                        <div
                          className="stats-item text-center w-100 h-100"
                          style={{ cursor: "pointer" }}
                          onClick={shareToWhatsApp}
                        >
                          <div className="icon flex-shrink-0">
                            <i
                              className="fa-brands fa-square-whatsapp"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <p>Whatsapp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-5 order-1 order-lg-2 hero-img">
                <img
                  src="assets/img/hero-img.svg"
                  className="img-fluid mb-3 mb-lg-0"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section id="featured-services" class="featured-services section">

          <div class="container">

            <div class="row gy-4">

              <div class="col-lg-4 col-md-6 service-item d-flex">
                <div class="icon flex-shrink-0"><i class="fa-solid fa-bolt-lightning"></i></div>
                <div>
                  <h4 class="title">Fast</h4>
                  <p class="description">Our URL shortener works at lightning speed. Simply paste your link, click shorten, and you're ready to share in a flash.</p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 service-item d-flex">
                <div class="icon flex-shrink-0"><i class="fa-solid fa-dumbbell"></i></div>
                <div>
                  <h4 class="title">Reliable</h4>
                  <p class="description">Click with confidence, knowing you'll always reach your desired destination.</p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 service-item d-flex">
                <div class="icon flex-shrink-0"><i class="fa-solid fa-lock"></i></div>
                <div>
                  <h4 class="title">Secure</h4>
                  <p class="description">We prioritize top-notch security measures to protect both your information and your shortened links</p>
                </div>
              </div>

            </div>

          </div>

          </section>
      </main>
          
      <footer id="footer" class="footer">

        <div class="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong class="px-1 sitename">ShanTiny</strong> <span>All Rights Reserved</span></p>
          <div class="credits">
            Designed with <a href="https://bootstrapmade.com/">Bootstrap</a>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default UrlShortener;
