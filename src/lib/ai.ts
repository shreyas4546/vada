import { GoogleGenAI, Type } from "@google/genai";

// Ensure you set VITE_GEMINI_API_KEY in your .env file
// Cast to any to avoid TypeScript error with Vite's import.meta.env
const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_KEY' });

export const parseResumeText = async (resumeText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Updated to latest flash model for parsing
      contents: `Extract the following details from this resume text into JSON format: 
      - skills (array of strings)
      - education (array of strings, include degree and year)
      - experience (array of strings, summaries of roles)
      
      Resume Text:
      ${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            education: { type: Type.ARRAY, items: { type: Type.STRING } },
            experience: { type: Type.ARRAY, items: { type: Type.STRING } },
          }
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Parse Error:", error);
    return { skills: [], education: [], experience: [] };
  }
};

export const scoreApplication = async (resumeText: string, jobDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Updated to latest pro model for reasoning
      contents: `Act as a strict recruitment officer. Compare the Candidate Resume against the Job Description.
      
      Job Description:
      ${jobDescription}
      
      Candidate Resume:
      ${resumeText}
      
      Provide a match score from 0 to 100 and a 1-sentence analysis of why.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            analysis: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{"score": 0, "analysis": "Error analyzing"}');
  } catch (error) {
    console.error("AI Scoring Error:", error);
    return { score: 0, analysis: "AI Service Unavailable" };
  }
};