import React from "react";

export function TextResponse({
  text,
  setText,
}: {
  text: string;
  setText: any;
}) {
  const seedText = "Racism is...";

  return (
    <div>
      <h1>Add to this phrase</h1>
      <div>{seedText}</div>

      <textarea
        className="w-full resize-y border rounded focus:outline-none focus:shadow-outline"
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></textarea>
    </div>
  );
}
