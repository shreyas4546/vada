import { GoogleGenAI, Type, SchemaType } from "@google/genai";

// Ensure you set VITE_GEMINI_API_KEY in your .env file
// Note: In a real production app, never expose keys on the client. Use a proxy backend.
const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_KEY' });

export const parseResumeText = async (resumeText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
      model: "gemini-3-pro-preview", 
      contents: `Act as a strict recruitment officer. Compare the Candidate Resume against the Job Description.
      
      Job Description:
      ${jobDescription}
      
      Candidate Resume:
      ${resumeText}
      
      Provide a match score from 0 to 100 and a 1-sentence analysis of why.`,
      config: {
        // High budget for complex reasoning as requested
        thinkingConfig: { thinkingBudget: 32768 }, 
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

export const improveDescription = async (text: string, type: 'summary' | 'experience') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rewrite the following ${type} for a professional resume. Make it more impactful, use action verbs, and quantify achievements where possible. Keep it concise (under 50 words).
      
      Original Text: "${text}"`
    });
    return response.text || text;
  } catch (error) {
    return text;
  }
};

export const generateEmail = async (context: string, recipientRole: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a professional email from a College Placement Officer to a ${recipientRole}.
      Context: ${context}
      
      Return a JSON object with "subject" and "body".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                subject: { type: Type.STRING },
                body: { type: Type.STRING }
            }
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { subject: "Update", body: "Could not generate email." };
  }
};

export const chatWithCareerCoach = async (message: string) => {
    try {
        const response = await ai.models.generateContent({
            // Using Pro model for better conversational nuances as requested
            model: "gemini-3-pro-preview",
            contents: `You are a helpful, encouraging career coach for college students. 
            Keep answers short, professional, and actionable.
            
            Student: ${message}`,
        });
        return response.text;
    } catch (error) {
        return "I'm having trouble connecting to the career database right now.";
    }
}