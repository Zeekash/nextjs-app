"use client";
import React, { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

type SearchBarProps = {
  onSearch?: (value: string) => void;
  placeholder?: string;
};

const BlogSearchBar = ({
  onSearch,
  placeholder = "Search for blogs...",
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <div className="flex w-full overflow-hidden rounded-full border border-gray-300 bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm outline-none"
      />

      <button
        onClick={handleSearch}
        className="flex items-center justify-center bg-sky-800 px-4 text-white hover:bg-sky-900"
      >
        <RxMagnifyingGlass />
      </button>
    </div>
  );
};

export default BlogSearchBar;