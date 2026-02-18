import React, { useState, useRef, useEffect, useCallback } from "react";

interface SearchSuggestion {
  text: string;
  category?: string;
  type?: 'suggestion' | 'recent' | 'trending';
}

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  suggestions?: SearchSuggestion[];
  categories?: string[];
  showRecentSearches?: boolean;
  showTrending?: boolean;
  maxSuggestions?: number;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    value = "",
    onChange,
    onSearch,
    placeholder = "Search...",
    className = "",
    suggestions = [],
    categories = [],
    showRecentSearches = true,
    showTrending = true,
    maxSuggestions = 8,
    autoFocus = false,
  }) => {
    const [internalValue, setInternalValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [showDropdown, setShowDropdown] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchValue = onChange ? value : internalValue;

    // Load recent searches from localStorage
    useEffect(() => {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {
          setRecentSearches([]);
        }
      }
    }, []);

    // Auto focus
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setShowDropdown(false);
          setIsFocused(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const saveRecentSearch = useCallback(
      (query: string) => {
        if (!query.trim()) return;
        const updated = [
          query,
          ...recentSearches.filter((s) => s !== query),
        ].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      },
      [recentSearches],
    );

    const clearRecentSearches = () => {
      setRecentSearches([]);
      localStorage.removeItem("recentSearches");
    };

    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      setHighlightedIndex(-1);
      setShowDropdown(true);
      if (onChange) onChange(newValue);
    };

    const handleSearch = (query: string) => {
      if (query.trim()) {
        saveRecentSearch(query);
        if (onSearch) onSearch(query);
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      setInternalValue(suggestion);
      if (onChange) onChange(suggestion);
      handleSearch(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const filteredSuggestions = getFilteredSuggestions();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex].text);
        } else {
          handleSearch(searchValue);
        }
      } else if (e.key === "Escape") {
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    };

    const getFilteredSuggestions = (): SearchSuggestion[] => {
      const query = searchValue.toLowerCase().trim();
      const results: SearchSuggestion[] = [];

      // Add matching suggestions
      if (query) {
        const matching = suggestions
          .filter(
            (s) =>
              s.text.toLowerCase().includes(query) &&
              (!selectedCategory || s.category === selectedCategory),
          )
          .slice(0, maxSuggestions);
        results.push(...matching);
      }

      // Add recent searches if no query
      if (!query && showRecentSearches && recentSearches.length > 0) {
        results.push(
          ...recentSearches.slice(0, 5).map((text) => ({
            text,
            type: "recent" as const,
          })),
        );
      }

      // Add trending if enabled and space available
      if (showTrending && results.length < maxSuggestions) {
        const trending = suggestions
          .filter((s) => s.type === "trending")
          .slice(0, maxSuggestions - results.length);
        results.push(...trending);
      }

      return results.slice(0, maxSuggestions);
    };

    const filteredSuggestions = getFilteredSuggestions();
    const shouldShowDropdown =
      showDropdown &&
      isFocused &&
      (filteredSuggestions.length > 0 || recentSearches.length > 0);

    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <div className="relative flex items-center">
          {/* Category Dropdown */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 h-[calc(100%-8px)] px-2 sm:px-3 text-xs sm:text-sm bg-slate-50 border-r border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-emerald-500 z-10 w-[100px] sm:w-[120px]"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowDropdown(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full py-3 sm:py-4 ${categories.length > 0 ? "pl-[138px] sm:pl-[158px]" : "pl-10 sm:pl-12"} pr-20 sm:pr-24 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm sm:text-base`}
          />

          {/* Search Icon */}
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute ${categories.length > 0 ? "left-[108px] sm:left-[128px]" : "left-3 sm:left-4"} top-1/2 transform -translate-y-1/2 pointer-events-none`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Clear Button */}
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setInternalValue("");
                if (onChange) onChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-[60px] sm:right-[68px] top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            type="button"
            onClick={() => handleSearch(searchValue)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 sm:px-4 py-2 rounded-md hover:from-emerald-700 hover:to-teal-700 transition-all text-xs sm:text-sm font-medium"
          >
            Go
          </button>
        </div>

        {/* Dropdown Suggestions */}
        {shouldShowDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {/* Recent Searches Header */}
            {!searchValue && recentSearches.length > 0 && (
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Recent Searches
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Suggestions List */}
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors flex items-center gap-3 ${
                  highlightedIndex === index ? "bg-emerald-50" : "bg-white"
                }`}
              >
                {/* Icon based on type */}
                {suggestion.type === "recent" ? (
                  <svg
                    className="w-4 h-4 text-slate-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : suggestion.type === "trending" ? (
                  <svg
                    className="w-4 h-4 text-emerald-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-slate-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900 truncate">
                    {suggestion.text}
                  </div>
                  {suggestion.category && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      in {suggestion.category}
                    </div>
                  )}
                </div>

                {/* Arrow icon */}
                <svg
                  className="w-4 h-4 text-slate-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}

            {/* No results */}
            {filteredSuggestions.length === 0 && searchValue && (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                No suggestions found
              </div>
            )}

            {/* Keyboard shortcuts hint */}
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
              <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;