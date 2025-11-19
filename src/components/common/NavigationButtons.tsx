"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  showPrevious?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextHref?: string;
  previousHref?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
}

export function NavigationButtons({
  showPrevious = true,
  showNext = true,
  nextDisabled = false,
  nextHref,
  previousHref,
  onNext,
  onPrevious,
  nextLabel = "Lanjut",
  previousLabel = "Kembali",
}: NavigationButtonsProps) {
  const router = useRouter();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextHref) {
      router.push(nextHref);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (previousHref) {
      router.push(previousHref);
    }
  };

  return (
    <div className="flex gap-4 mt-10">
      {showPrevious && (
        <button
          onClick={handlePrevious}
          className="flex-1 px-4 py-3 border border-gray-900 text-gray-900 font-light hover:bg-gray-50 transition"
        >
          {previousLabel}
        </button>
      )}
      {showNext && (
        <button
          onClick={handleNext}
          disabled={nextDisabled}
          className={`flex-1 px-4 py-3 font-light transition ${
            nextDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-gray-900 text-white hover:bg-gray-800 border border-gray-900"
          }`}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
