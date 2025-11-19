import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Note: In a real app, API keys should not be client-side exposed like this.
// Since this is a client-only requirement, we assume process.env.API_KEY is injected or handled securely.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getProductAdvice = async (product: Product, question: string): Promise<string> => {
  if (!apiKey) return "Please configure your API Key to use the AI Assistant.";

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert sales assistant for Jojo's Web-Store, the coolest e-commerce shop.
      Product Details:
      Title: ${product.title}
      Description: ${product.description}
      Price: $${product.price}
      Category: ${product.category}
      Rating: ${product.rating} stars

      User Question: ${question}

      Answer the user's question helpfully, highlighting the product's benefits. Keep it under 100 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "I couldn't think of a good answer right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI service at the moment.";
  }
};

export const getSupportResponse = async (query: string): Promise<string> => {
  if (!apiKey) return "Please configure your API Key to use the Support Agent.";

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are a friendly and professional customer support agent for Jojo's Web-Store, a high-end e-commerce store selling electronics, fashion, and home goods.
      
      User Query: "${query}"
      
      Provide a helpful, empathetic, and concise response (under 100 words). 
      - If it's about a return, mention our 30-day return policy.
      - If it's about shipping, mention that standard shipping takes 3-5 business days.
      - If the user seems angry, be apologetic and reassuring.
      - If you cannot solve it, kindly ask them to email support@jojos-webstore.com or call our line.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "I didn't quite catch that. Could you please rephrase your issue?";
  } catch (error) {
    console.error("Gemini Support Error:", error);
    return "Our AI support agent is currently offline. Please use the contact details below.";
  }
};