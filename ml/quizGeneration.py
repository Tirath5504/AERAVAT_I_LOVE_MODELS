import google.generativeai as genai
import gradio as gr

api_key = "AIzaSyAMfftpsTHFJx-4xhoOAKCM-Uc42SKOb98"

model = genai.GenerativeModel('gemini-pro')
genai.configure(api_key = api_key)
chat = model.start_chat(history=[])
temp = chat.send_message(f"""
    You are an expert quiz designer based on lecture notes LLM. Your task is to take notes of a lecture, and 
    turn them into notes.""")

def generate_quiz(prompt):
    input = prompt + """\n\nGenerate 5 questions from this , each of 4 OPTIONS ONLY ALWAYS PLEASE , NEVER EVERY GENERATE A QUESTION OF 2 OPTIONS.
PLEASE PLEASE PLEASE GIVE ME A JSON OUTPUT of this format:
[{questionText, questionOptions[](array of 4 strings), questionAnswerIndex}]"""

    output = chat.send_message(input)
    return output.text[8 : -3]

iface = gr.Interface(
    fn= generate_quiz,
    inputs= "text",
    outputs= "text",
    title="Aeravat  Quiz Generation",
)
    
# Launch the Gradio interface
iface.launch(share=True)