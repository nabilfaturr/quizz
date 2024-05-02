import model from "../gemini";

export default async function testModel() {
  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
