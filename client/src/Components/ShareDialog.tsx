import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import QRcode from './Utils/QRcode';
import {
    WhatsappIcon,
    WhatsappShareButton,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';
import { Button } from './ui/button';
import {
    Share,
    Download,
    ExternalLink,
    Smartphone,
    Monitor,
} from 'lucide-react';
import Copy from './Utils/Copy';
import { useRef } from 'react';
// import { Separator } from './ui/separator';

interface shortUrlProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    value: string;
}

const ShareDialog = ({ open, onOpenChange, value }: shortUrlProps) => {
    const qrRef = useRef(null);

    const downloadQR = () => {
        const svg = qrRef.current;
        if (!svg) return;

        // Create a canvas and draw the SVG onto it
        const canvas = document.createElement('canvas');
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            // Download as PNG
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        img.src = url;
    };

    const shareQR = async () => {
        const svg = qrRef.current;
        if (!svg) return;

        const canvas = document.createElement('canvas');
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);

        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            canvas.toBlob(async (blob) => {
                if (
                    navigator.canShare &&
                    navigator.canShare({
                        files: [
                            new File([blob], 'qrcode.png', {
                                type: 'image/png',
                            }),
                        ],
                    })
                ) {
                    try {
                        await navigator.share({
                            files: [
                                new File([blob], 'qrcode.png', {
                                    type: 'image/png',
                                }),
                            ],
                            title: 'QR Code',
                            text: 'Scan this QR code!',
                        });
                    } catch (err) {
                        alert('Sharing failed: ' + err.message);
                    }
                } else {
                    alert(
                        'Sharing images is not supported on this device/browser.'
                    );
                }
            }, 'image/png');
        };
        img.src = url;
    }; 

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            <DialogContent
                className="max-w-md w-fit h-fit p-4"
                showCloseButton={true}
            >
                <DialogHeader className="mb-1">
                    <DialogTitle className="text-xl font-semibold">
                        Share your link
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Share this URL or scan the QR code below
                    </p>
                </DialogHeader>

                <div className="space-y-4 w-fit h-fit">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-background border-2 border-dashed border-border rounded-lg">
                            <QRcode ref={qrRef} value={value} />
                        </div>

                        <div className="flex gap-2 w-full">
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={downloadQR}
                                size="sm"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download QR
                            </Button>
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={shareQR}
                                size="sm"
                            >
                                <Share className="h-4 w-4 mr-2" />
                                Share QR
                            </Button>
                        </div>
                    </div>

                    {/* URL Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Short URL
                            </span>
                        </div>

                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border">
                            <span
                                className="text-sm font-mono flex-1 truncate"
                                title={value}
                            >
                                {value}
                            </span>
                            <Copy url={value} />
                        </div>
                    </div>

                    {/* Social Share Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Share className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Share on social
                            </span>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            <WhatsappShareButton
                                url={value}
                                title="Check out this link!"
                            >
                                <div className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <WhatsappIcon size={24} round />
                                    <span className="text-xs text-muted-foreground">
                                        WhatsApp
                                    </span>
                                </div>
                            </WhatsappShareButton>

                            <TwitterShareButton
                                url={value}
                                title="Check out this link!"
                            >
                                <div className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <TwitterIcon size={24} round />
                                    <span className="text-xs text-muted-foreground">
                                        Twitter
                                    </span>
                                </div>
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={value}
                                title="Check out this link!"
                            >
                                <div className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <LinkedinIcon size={24} round />
                                    <span className="text-xs text-muted-foreground">
                                        LinkedIn
                                    </span>
                                </div>
                            </LinkedinShareButton>

                            <TelegramShareButton
                                url={value}
                                title="Check out this link!"
                            >
                                <div className="flex flex-col items-center gap-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                    <TelegramIcon size={24} round />
                                    <span className="text-xs text-muted-foreground">
                                        Telegram
                                    </span>
                                </div>
                            </TelegramShareButton>
                        </div>
                    </div>

                    {/* Device Tips */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <div className="flex gap-1 mt-1">
                                <Smartphone className="h-3 w-3 text-blue-600" />
                                <Monitor className="h-3 w-3 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                    Quick sharing tip
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-200">
                                    On mobile, use the QR share button to
                                    quickly send via your device's native
                                    sharing options.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareDialog;
