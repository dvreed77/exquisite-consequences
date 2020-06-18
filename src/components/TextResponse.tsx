import React from "react";

export function TextResponse({
  prompt,
  text,
  setText,
}: {
  prompt: string;
  text: string;
  setText: any;
}) {
  const maxCharacters = 50;

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setText(text.substring(0, maxCharacters));
  }

  const p1 = prompt.split(" ")[0];
  const p2 = prompt.split(" ").slice(1).join(" ");

  return (
    <div className="p-3">
      <div className="text-3xl text-gray-600 text-center">
        How {p1}{" "}
        <span className="text-4xl text-gray-800 font-semibold">{p2}</span> make
        you feel?
      </div>
      <div className="text-center p-3 text-xs text-blue-700">
        Your input will be included along with others inputs
      </div>
      <textarea
        className="border focus:outline-none focus:shadow-outline px-4 py-2 resize-y rounded text-2xl text-gray-700 w-full"
        value={text}
        onChange={onChange}
      ></textarea>
      <div className="text-gray-500">
        {maxCharacters - text.length} characters left
      </div>
    </div>
  );
}
