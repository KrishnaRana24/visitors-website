"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";

export default function DynamicQR({ url }) {
  const websiteUrl = "/userSignup";
  const [qrData, setQrData] = useState(websiteUrl);
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
}
