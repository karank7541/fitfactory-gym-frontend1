import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let active = true;
    readerRef.current = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        // CAMERA START
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          await videoRef.current.play();
        }

        // FAST AND STABLE SCAN LOOP
        readerRef.current.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, err) => {
            if (!active) return;

            if (result) {
              active = false;

              // 🛑 STOP CAMERA PROPERLY (MAC FIX)
              stopCameraFully();

              // small delay (scanner की closure से conflict रोकने के लिए)
              setTimeout(() => {
                onScan(result.getText());
              }, 100);
            }
          }
        );
      } catch (err) {
        console.error("Camera start error:", err);
      }
    };

    startScanner();

    return () => {
      active = false;
      stopCameraFully();
      try {
        readerRef.current?.reset();
      } catch {}
    };
  }, []);

  // 🛑 MAC-SAFE CAMERA STOP FUNCTION
  const stopCameraFully = () => {
    try {
      // stop all video tracks
      const stream = streamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // blank out video element fully (MAC fix)
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    } catch (e) {
      console.warn("Camera stop error:", e);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <video
        ref={videoRef}
        className="w-full max-w-sm rounded-lg shadow-lg"
      />
    </div>
  );
};

export default QRScanner;