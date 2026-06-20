import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-base-content/30" />
      <Input
        placeholder={placeholder}
        className="pl-10 md:pl-12 h-10 md:h-12 bg-base-100 border-base-300 focus:border-primary text-base-content rounded-btn transition-all text-sm md:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
