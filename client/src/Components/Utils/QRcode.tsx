import { QRCodeSVG } from 'qrcode.react';
import { forwardRef } from 'react';
import { useTheme } from 'next-themes';

const QRcode = forwardRef<SVGSVGElement, { value: string }>(
    ({ value }, ref) => {
        const { resolvedTheme } = useTheme();
        const isDark = resolvedTheme === 'dark';

        return (
            <QRCodeSVG
                ref={ref}
                value={value}
                title={'QR Code'}
                bgColor={isDark ? '#000000' : '#ffffff'}
                fgColor={isDark ? '#ffffff' : '#000000'}
                level={'M'}
                marginSize={4}
                minVersion={1}
                className="h-32 w-32 sm:h-44 sm:w-44"
            />
        );
    }
);

QRcode.displayName = 'QRcode';

export default QRcode;
