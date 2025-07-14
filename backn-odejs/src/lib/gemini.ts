// src/lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function perguntarGemini(pergunta: string, cidade: string) {
  const prompt = `
    Você é um guia turístico especializado em ${cidade}.
    Responda de forma útil e amigável sobre a cidade.
    Pergunta do usuário: ${pergunta}
    Foque em: pontos turísticos, restaurantes, cultura local, dicas práticas.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error);
    throw new Error('Erro ao consultar IA');
  }
}
