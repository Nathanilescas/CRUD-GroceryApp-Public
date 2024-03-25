import ejs from "ejs";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "Display", "mainAccessShell.ejs");

class Display {
  LoadPage(filePath, data = null) {
    try {
      let render;
      const fileContent = fs.readFileSync(filePath, "utf8");
      if (data) {
        render = ejs.render(fileContent, data);
      } else {
        render = ejs.render(fileContent);
      }
      return render;
    } catch (error) {
      console.error("Error:", error);
      return null; // or throw error, depending on how you want to handle it
    }
  }
}

const dis = new Display();
const render = dis.LoadPage(filePath);
console.log(render);
