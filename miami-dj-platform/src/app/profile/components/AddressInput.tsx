import React, { useState, useRef, useEffect } from "react";

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  suggestions: any[];
  onSuggestionSelect: (val: string) => void;
  onInput: (val: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  placeholder?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  label,
  value,
  onChange,
  suggestions,
  onSuggestionSelect,
  onInput,
  showSuggestions,
  setShowSuggestions,
  placeholder = "Address",
}) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    if (showSuggestions) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSuggestions, setShowSuggestions]);

  return (
    <div className="relative flex-1">
      <input
        className="w-full px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onInput(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 left-0 right-0 bg-white dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded shadow max-h-48 overflow-y-auto"
        >
          {suggestions.map((s, i) => (
            <div
              key={s.place_id || i}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-900 dark:text-blue-100"
              onClick={() => {
                onSuggestionSelect(s.description);
                setShowSuggestions(false);
              }}
            >
              {s.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
