import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generarResumen = async (descripcion) => {
  try {
    console.log("Solicitando resumen a OpenAI...");
    console.log("Descripción recibida:", descripcion);

    const prompt = `
      Eres un asistente profesional que resume proyectos.
      Genera un resumen breve, claro y técnico del siguiente texto:
      ---
      ${descripcion}
      ---
      Responde solo con el resumen.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const textoGenerado = response.choices[0]?.message?.content?.trim();

    console.log("Resumen generado con OpenAI:", textoGenerado);
    return textoGenerado || "No se pudo generar resumen";
  } catch (error) {
    console.error("Error en IA service:", error.message);
    throw new Error("Error al generar resumen con OpenAI");
  }
};
