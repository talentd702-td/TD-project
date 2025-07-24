// Gemini AI Service
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCyB-UP1k3jtiIxoTWSToeXc8ejvLDq2vo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// FLUX API Configuration
const FLUX_API_KEY = process.env.NEXT_PUBLIC_FLUX_API_KEY; // You'll need to add this to your .env.local
const FLUX_API_URL = 'https://fal.run/fal-ai/flux-pro/kontext/text-to-image';

export async function generateSoulmateAnalysis(userData) {
  try {
    const { name, gender, dateOfBirth, timeOfBirth, birthPlace } = userData;
    
    const prompt = `
Based on the following birth details, provide a detailed life partner/soulmate analysis including physical appearance, personality traits, and compatibility insights:

Personal Details:
- Name: ${name}
- Gender: ${gender}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth}
- Birth Place: ${birthPlace}

Please provide a comprehensive analysis covering:

1. **Physical Appearance of Life Partner:**
   - Height and build
   - Facial features
   - Hair color and style
   - Eye color
   - Overall appearance and style

2. **Personality Traits:**
   - Core personality characteristics
   - Strengths and positive qualities
   - Communication style
   - Emotional nature

3. **Compatibility Analysis:**
   - What makes you compatible
   - Shared interests and values
   - How you complement each other
   - Potential challenges and how to overcome them

4. **Relationship Timeline:**
   - When you might meet
   - How your relationship will develop
   - Key milestones in your relationship

5. **Advice for Finding Your Soulmate:**
   - Where you might meet them
   - What to look for
   - How to recognize them

Please make this analysis detailed, positive, and insightful based on astrological and numerological principles. Format the response in a clear, easy-to-read structure with proper headings and bullet points.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate soulmate analysis. Please try again.');
  }
}

export async function generateSoulmateImagePrompt(userData) {
  try {
    const { name, gender, dateOfBirth, timeOfBirth, birthPlace } = userData;
    
    const prompt = `
Based on the following birth details, create a detailed visual description for generating a pencil sketch portrait of their ideal life partner/soulmate:

Personal Details:
- Name: ${name}
- Gender: ${gender}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth}
- Birth Place: ${birthPlace}

Generate a detailed physical description for a pencil sketch portrait that includes:

1. **Facial Structure**: Face shape, jawline, cheekbones
2. **Eyes**: Shape, size, expression, eyebrows
3. **Hair**: Style, length, texture, how it frames the face
4. **Nose and Mouth**: Shape and characteristics
5. **Overall Expression**: The emotion/feeling they convey
6. **Age Range**: Approximate age appearance
7. **Style Elements**: Any distinctive features or accessories

Create a single, cohesive description that would work well for a pencil sketch portrait. Focus on:
- Attractive, harmonious features
- Warm, kind expression
- Features that would complement the user based on astrological compatibility
- Details that work well in pencil sketch format

Format this as a single paragraph description suitable for an AI image generator, focusing on creating a beautiful pencil sketch portrait. The description should be specific enough to generate a consistent image but artistic and appealing.

Example format: "Pencil sketch portrait of [detailed description], soft shading, artistic sketching style, detailed facial features, warm expression..."
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw new Error('Failed to generate image prompt. Please try again.');
  }
}

export async function generateSoulmateImage(imagePrompt) {
  try {
    if (!FLUX_API_KEY) {
      throw new Error('FLUX API key not configured. Please add NEXT_PUBLIC_FLUX_API_KEY to your environment variables.');
    }

    // Enhance the prompt for pencil sketch style
    const enhancedPrompt = `${imagePrompt}, detailed pencil sketch, graphite drawing, artistic shading, soft lines, portrait drawing style, realistic pencil artwork, fine art sketch, detailed facial features, expressive eyes, beautiful pencil portrait`;

    const response = await fetch(FLUX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FLUX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        guidance_scale: 3.5,
        num_images: 1,
        output_format: "jpeg",
        safety_tolerance: "2",
        aspect_ratio: "3:4", // Portrait aspect ratio
        sync_mode: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`FLUX API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      imageUrl: data.images[0].url,
      prompt: data.prompt,
      seed: data.seed
    };
  } catch (error) {
    console.error('Error calling FLUX API:', error);
    throw new Error('Failed to generate soulmate image. Please try again.');
  }
}