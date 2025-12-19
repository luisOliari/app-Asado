import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });
const modelId = "gemini-2.5-flash";

export const generateGroupMotto = async (groupName: string, vibe: string): Promise<string> => {
  try {
    const ai = getAI();
    const effectiveVibe = vibe.trim() || "amigos de fiesta y playa";
    const prompt = `
      Eres un experto en cultura joven uruguaya y argentina.
      Genera un lema (motto) corto, divertido y pegadizo para un grupo de amigos que va a Punta del Diablo llamado "${groupName}".
      El ambiente del grupo es: ${effectiveVibe}.
      El lema debe ser en español rioplatense, máximo 12 palabras.
      Solo devuelve el texto del lema, nada más.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    
    return (response.text || "").replace(/"/g, '').trim();
  } catch (error) {
    console.error("Error generating motto:", error);
    // Fallback different messages to simulate variety if it fails repeatedly
    const fallbacks = [
        "Donde hay humo, hay asado.",
        "Parrilla, amigos y nada más.",
        "Un aplauso para el asador.",
        "La vida es mejor con brasas."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};

export const getIcebreaker = async (myGroupName: string, theirGroupName: string): Promise<string> => {
  try {
    const ai = getAI();
    const prompt = `
      Genera una frase rompehielo divertida para iniciar un chat en una app de citas grupal para asados.
      El grupo "${myGroupName}" le habla al grupo "${theirGroupName}".
      Debe ser casual, veraniego y relacionado con comida o bebida.
      Solo devuelve la frase.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return (response.text || "").trim();
  } catch (error) {
    console.error("Error generating icebreaker:", error);
    return "¿Salen esos choripanes?";
  }
};

export const getAsadoTips = async (query: string): Promise<string> => {
  try {
    const ai = getAI();
    const prompt = `
      Eres "El Asador Virtual", un experto gaucho en parrilla.
      Responde brevemente a esta duda sobre el asado: "${query}".
      Usa un tono rústico pero amable. Máximo 2 oraciones.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return (response.text || "").trim();
  } catch (error) {
    return "Che, poné la carne cuando la brasa tenga una capa de ceniza blanca. No falla.";
  }
};