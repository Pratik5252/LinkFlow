import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { Button } from "../ui/button";

const Copy = ({ url }) => {
  const [copied, setCopied] = useState(true);

  const copyText = () => {
    try {
      navigator.clipboard.writeText(url);
      setCopied(false);
      setTimeout(() => {
        setCopied(true);
      }, 5000);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <Button
      variant="outline"
      onClick={() => copyText()}
      className="cursor-pointer border text-foreground hover:text-primary transition-all duration-300"
    >
      <DynamicIcon
        name={copied ? "copy" : "check"}
        size={16}
        strokeWidth={1}
        className={`${
          copied ? " " : "text-primary"
        } transition-all duration-300`}
      />
    </Button>
  );
};

export default Copy;
