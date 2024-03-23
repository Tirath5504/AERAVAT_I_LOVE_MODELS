import google.generativeai as genai
import gradio as gr

api_key = "AIzaSyAMfftpsTHFJx-4xhoOAKCM-Uc42SKOb98"

model = genai.GenerativeModel('gemini-pro')
genai.configure(api_key = api_key)
chat = model.start_chat(history=[])
temp = chat.send_message(f"""
    You are an expert lecture notes designer LLM. Your task is to take a transcript of a lecture, 
    and turn it into notes. You will receive transcripts of lectures based on Physics , Chemistry and Mathematics.""")

def generate_notes(prompt):
    input = "Generate lecture notes from this transcript. Please make sure to fully understand this transcript first, and then generate the notes.\n" + prompt
    output = chat.send_message(input)
    return output.text

iface = gr.Interface(
    fn= generate_notes,
    inputs= "text",
    outputs= "text",
    title="Aeravat  Note Generation",
)


# Launch the Gradio interface
iface.launch(share=True)