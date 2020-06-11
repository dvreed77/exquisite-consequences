import React from "react";

export function TextResponse({
  text,
  setText,
}: {
  text: string;
  setText: any;
}) {
  const seedText = "Racism is...";

  const maxCharacters = 50;

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setText(text.substring(0, maxCharacters));
  }

  return (
    <div className="p-3">
      <div className="rounded bg-blue-100 p-3 text-sm text-blue-700 mb-4">
        Finish this phrase. Your input will be included along with others inputs
      </div>

      <div className="text-4xl text-gray-600 text-center">{seedText}</div>
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
