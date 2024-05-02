import fs from "fs";

export const logResult = async (data: any) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  const fullTime = hour + ":" + minute + ":" + second;

  await fs.writeFile(`./src/gemini_logs/${fullTime}.txt`, data, { flag: "w" }, (err) => {
    if (err) throw err;
  });
};
