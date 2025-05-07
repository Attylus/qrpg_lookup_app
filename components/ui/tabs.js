import React from "react";

export function Tabs({ value, onValueChange, children }) {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onValueChange })
      )}
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex gap-2 mb-2">{children}</div>;
}

export function TabsTrigger({ value, children, onValueChange }) {
  const handleClick = () => {
    if (typeof onValueChange === "function") {
      onValueChange(value);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
