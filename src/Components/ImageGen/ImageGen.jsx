import React, { useRef, useState } from "react";
import "./ImageGen.css"; // Assuming your CSS file is named ImageGen.css
import Navbar from "../Navbar/Navbar";

const ImageGen = () => {
  const [image_url, set_image_url] = useState("");
  const inputRef = useRef(null);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      set_error("Please enter a prompt.");
      return;
    }

    set_loading(true); // Start loading
    set_error(null); // Clear any previous errors
    set_image_url(""); // Clear the current image URL

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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", // Replace with your OpenAI API key
            "user-agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: inputRef.current.value,
            n: 1,
            size: "512x512",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Image generation failed");
      }

      const data = await response.json();
      const data_array = data.data;
      set_image_url(data_array[0].url);
    } catch (error) {
      console.error("Image generation error:", error);
      set_error("Image generation failed. Please try again.");
    } finally {
      set_loading(false); // Stop loading
    }
  };

  const clearImage = () => {
    set_image_url("");
    inputRef.current.value = "";
  };

  const downloadImage = () => {
    if (image_url) {
      const link = document.createElement("a");
      link.href = image_url;
      link.download = "generated_image.png"; // Specify the filename here
  
      // Check if we are running in a mobile app
      const isMobileApp =
        window.navigator.standalone ||
        window.matchMedia("(display-mode: standalone)").matches;
  
      if (isMobileApp) {
        // For mobile apps, create a custom download function
        const reader = new FileReader();
        const xhr = new XMLHttpRequest();
  
        xhr.responseType = "blob";
        xhr.onload = () => {
          reader.onloadend = () => {
            const data = reader.result;
            const blob = new Blob([data], { type: "image/png" });
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = "generated_image.png"; // Specify the filename here
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          };
  
          reader.readAsArrayBuffer(xhr.response);
        };
  
        xhr.open("GET", image_url);
        xhr.send();
      } else {
        // For web browsers, use the standard download approach
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="ai-img-gen">
        {image_url ? null : (
          <>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
          </>
        )}
       
        <div className="img-loading">
          {image_url && (
            <div className="image ">
             <img src={image_url} alt="Generated" />
              <div className="download-btn" onClick={downloadImage}>
                Download
              </div>
            </div>
          )}
          {loading && !image_url && (
            <div className="loading-spinner">
              {/* Replace with your loading spinner component or use CSS */}
              <div className="spinner">
                <div className="loading-spinner">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        </div>
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Enter Your Prompt Here"
          />
          <div
            className="generate-btn"
            onClick={imageGenerator}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : <span>Generate</span>}
            {loading && <span>Generating...</span>}
          </div>
          &nbsp;&nbsp;
          <div className="clear-btn" onClick={clearImage}>
            Clear
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
          </>
    </div>
  );
};

export default ImageGen;
