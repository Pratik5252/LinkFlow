import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";

const QRcode = forwardRef<SVGSVGElement, { value: string }>(
  ({ value }, ref) => {
    return (
      <QRCodeSVG
        ref={ref}
        value={value}
        title={"QR Code"}
        size={240}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        marginSize={2}
        minVersion={8}
        //   imageSettings={{
        //     src: "https://static.zpao.com/favicon.png",
        //     x: undefined,
        //     y: undefined,
        //     height: 24,
        //     width: 24,
        //     opacity: 1,
        //     excavate: true,
        //   }}
      />
    );
  }
);

export default QRcode;
