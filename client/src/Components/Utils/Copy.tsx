import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";

const Copy = (shortUrl: { shortUrl: string }) => {
  const [copied, setCopied] = useState(true);

  const copyText = (shortUrl: { shortUrl: string }) => {
    try {
      navigator.clipboard.writeText(shortUrl.shortUrl);
      setCopied(false);
      setTimeout(() => {
        setCopied(true);
      }, 5000);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <button
      onClick={() => copyText(shortUrl)}
      className="cursor-pointer border rounded p-1 text-foreground hover:text-primary transition-all duration-300"
    >
      <DynamicIcon
        name={copied ? "copy" : "check"}
        size={16}
        strokeWidth={1}
        className={`${
          copied ? " " : "text-primary"
        } transition-all duration-300`}
      />
    </button>
  );
};

export default Copy;
