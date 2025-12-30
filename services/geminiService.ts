import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chatInstance: Chat | null = null;

  constructor() {
    // Initializing the client with the provided API key from environment variables
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public initChat(level: string) {
    this.chatInstance = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\nO nível atual do usuário é: ${level}. Adapte sua linguagem adequadamente.`,
        temperature: 0.7,
      },
    });
  }

  public async* sendMessageStream(message: string) {
    if (!this.chatInstance) {
      throw new Error("Chat not initialized");
    }

    try {
      const result = await this.chatInstance.sendMessageStream({ message });
      for await (const chunk of result) {
        // Accessing the .text property of the GenerateContentResponse chunk
        yield (chunk as GenerateContentResponse).text || "";
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      yield "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.";
    }
  }
}

export const geminiService = new GeminiService();