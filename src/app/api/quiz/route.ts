import model from "@/lib/gemini";
import { generateQuiz } from "@/lib/gemini/function";
import { logResult } from "@/lib/utils/function";
import { TCreateFormSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: TCreateFormSchema = await request.json();

    const result = await generateQuiz(body);
    let quiz = "";

    if (typeof quiz === "string") {
      quiz = JSON.parse(result);
    } else {
      quiz = result;
    }

    if (!result) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    console.log({ result, type: typeof result });

    // return NextResponse.json(true, { status: 200 });
    return NextResponse.json(JSON.stringify(quiz), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
