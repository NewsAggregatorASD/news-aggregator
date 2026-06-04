"use client";
import { useState } from "react";
import { X, Link, Check, Share2 } from "lucide-react";

interface Props {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: Props) => {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      label: "X (Twitter)",
      icon: <X className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-zinc-500/20 hover:border-zinc-500/50 hover:text-white",
    },
    {
      label: "WhatsApp",
      icon: <span className="text-sm font-bold">W</span>,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-400",
    },
    {
      label: "LinkedIn",
      icon: <span className="text-sm font-bold">in</span>,
      href: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400",
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-zinc-500 text-sm flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Share
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-sm transition-all ${item.color}`}
        >
          {item.icon}
          {item.label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-sm transition-all hover:bg-zinc-700 hover:text-white"
      >
        {copied
          ? <><Check className="w-4 h-4 text-green-400" /> Copied!</>
          : <><Link className="w-4 h-4" /> Copy Link</>
        }
      </button>
    </div>
  );
};

export default ShareButtons;