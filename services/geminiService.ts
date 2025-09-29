
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const convertToGhibliStyle = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: 'Transform this image into the Studio Ghibli art style. Ensure the output has a painterly, whimsical, and nostalgic feel characteristic of their films.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        // The API can return multiple parts, we need to find the image part.
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }

        return null;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image from Gemini API.");
    }
};
