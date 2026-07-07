"use client";

import {
  FormEvent,
  useState,
} from "react";
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

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full overflow-hidden rounded-full bg-white shadow-md ring-1 ring-gray-100"
    >
      <input
        type="search"
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-gray-500"
      />

      <button
        type="submit"
        aria-label="Search blogs"
        className="flex w-14 shrink-0 items-center justify-center bg-sky-800 text-xl text-white transition-colors hover:bg-sky-900"
      >
        <RxMagnifyingGlass />
      </button>
    </form>
  );
};

export default BlogSearchBar;