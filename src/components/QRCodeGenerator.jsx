import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({
  value,
  size = 120,
  bgColor = '#ffffff',
  fgColor = '#000000',
  level = 'H',
  includeMargin = true
}) => {
  return (
    <div className="qr-code-container">
      <QRCodeCanvas
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={includeMargin}
      />
    </div>
  );
};

export default QRCodeGenerator;
