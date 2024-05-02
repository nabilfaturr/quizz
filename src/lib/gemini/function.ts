import model from ".";
import { TCreateFormSchema } from "../zod";

export async function generateQuiz({
  amount,
  grade,
  hardLevel,
  subject,
}: TCreateFormSchema) {
  const prompt = `
    Output : 
    - Berikan pertanyaan dan jawaban dalam bentuk json dengan form seperti berikut : 
        [
            {
                "question": "",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": {
                    "index": ""
                    "value": ""
                }
            }
        ]
    - Pastikan json yang anda kirim benar benar bersih. agar saya bisa melakukan JSON.parse() secara langsung tanpa perlu cleaning data-nya
    - Wajib menggunakan bahasa indonesia.
    
    Spesifikasi Quiz : 
    - Mata Pelajaran : ${subject}
    - Tingkat Kesulitan : ${hardLevel}
    - Tingkatan : ${grade}
    - Jumlah Pertanyaan : ${amount}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (!response) {
      return false;
    }

    const text = response.text();
    const textToJson = generateJsonQuiz(text);
    console.log({ textToJson });
    return textToJson;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const generateJsonQuiz = (quiz: string) => {
  try {
    return JSON.parse(quiz);
  } catch (error) {
    const cleanedJson = cleaningJson(quiz);
    return cleanedJson;
  }
};

export const cleaningJson = (data: string) => {
  try {
    return data.replace(/`/g, "").slice(4, data.length);
  } catch (error) {
    return false;
  }
};
