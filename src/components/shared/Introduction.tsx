import Link from "next/link";
import React from "react";

const Introduction = () => {
  return (
    <div className="p-5 rounded-lg bg-slate-300 space-y-2">
      <h1 className="text-4xl font-bold">Quiz</h1>
      <p className="text-xl text-slate-700">
        adalah sebuah platform untuk membuat quiz mata pelajaran secara otomatis
        menggunakan AI.{" "}
      </p>
      <p className="text-lg">
        Powered by{" "}
        <Link
          className="underline text-blue-700"
          href="https://deepmind.google/technologies/gemini/#introduction"
        >
          Gemini AI
        </Link>
      </p>
    </div>
  );
};

export default Introduction;
