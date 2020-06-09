import React from "react";

export function Final({ onSubmit }: { onSubmit: any }) {
  return (
    <div>
      Click to Submit
      <button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base"
      >
        Submit
      </button>
    </div>
  );
}
