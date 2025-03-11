import os
import speech_recognition as sr
import pyttsx3
from langchain_openai import ChatOpenAI

# Set your OpenAI API Key
openai_api_key = ""  # Replace with your actual API key

# Initialize AI Model
chat_model = ChatOpenAI(openai_api_key=openai_api_key, temperature=0.7)

# Initialize Speech Recognition and Text-to-Speech
recognizer = sr.Recognizer()
engine = pyttsx3.init()

# Function to convert text to speech
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Function to take voice input
def listen():
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source)
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Sorry, I didn't understand.")
            return None
        except sr.RequestError:
            print("Speech service is unavailable.")
            return None

# Function to interact with AI Shopping Assistant
def shopping_assistant():
    print("Welcome to the AI Shopping Assistant! How can I help you?")
    speak("Welcome to the AI Shopping Assistant! How can I help you?")

    while True:
        user_input = listen()
        if user_input:
            if "exit" in user_input.lower():
                print("Goodbye! Have a great day!")
                speak("Goodbye! Have a great day!")
                break

            # Get AI Response
            response = chat_model.invoke(user_input)
            print("AI Assistant:", response.content)
            speak(response.content)

# Run the AI Shopping Assistant
shopping_assistant()
