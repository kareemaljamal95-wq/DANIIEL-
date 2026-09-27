import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#2B0E16] via-[#1C080D] to-[#120408] border border-[#D4AF37]/20 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-12 h-12 text-[#D4AF37]/60 mb-3"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path
            d="M32 10C22 20 22 44 32 54C42 44 42 20 32 10Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="font-serif-display text-base text-[#FAF6F0]/90 tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
