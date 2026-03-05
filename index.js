import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

const checkboxes = document.querySelectorAll(".checkbox")
const userInput = document.getElementById("textarea-input")
const translateBtn = document.getElementById("translate-btn")

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true
})

checkEnvironment();

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    if (box.checked) {
      checkboxes.forEach(otherBox => {
        if (otherBox !== box) {
          otherBox.checked = false;
        }
      });
    }
  });
});

translateBtn.addEventListener("click", async () => {
    
  const selectedCheckbox = Array.from(checkboxes).find(cb => cb.checked);
  const language = selectedCheckbox ? selectedCheckbox.value : "English";
  
  const messages = [ 
    {
        role: "system",
        content: `Make the translation short and correctly translated in this ${language} language`
    },
    {
        role: "user",
        content: userInput.value,
    }
   ]
  
  
    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages
    })
    
    const translation = response.choices[0].message.content 
    console.log(translation)
    
})
