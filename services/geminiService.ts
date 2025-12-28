
import { GoogleGenAI } from "@google/genai";

export const getAnimalFact = async (animalName: string): Promise<string> => {
  // 호출 직전에 인스턴스 생성 (가이드라인 준수)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide one short, fascinating, and fun fact about ${animalName} for a children's memory game. Keep it under 20 words. Be exciting!`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    
    return response.text?.trim() || `The ${animalName} is a truly amazing creature!`;
  } catch (error) {
    console.error("Error fetching animal fact:", error);
    return `Did you know the ${animalName} is one of nature's most interesting animals?`;
  }
};
