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
Create a concise, mystical soulmate reading for ${name}. Use the birth details below to provide specific insights. Format the response EXACTLY as shown with clear sections and bullet points for easy display:

Birth Details:
- Name: ${name}
- Gender: ${gender}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth}
- Birth Place: ${birthPlace}

Format your response EXACTLY like this:

APPEARANCE
Height: Medium to tall with an elegant presence
Build: Well-proportioned and naturally graceful
Face: Strong jawline with expressive, kind eyes
Hair: Dark brown or black, well-maintained style
Style: Classic and sophisticated, attention to detail

PERSONALITY
Core Traits: Loyal, intelligent, ambitious, independent
Strengths: Strong integrity, excellent communication, supportive nature
Communication: Direct and honest, values transparency
Emotional Nature: Stable and balanced, mature emotional handling

COMPATIBILITY
Shared Values: Loyalty, honesty, commitment to growth
Mutual Interests: Learning, culture, travel, building secure future
Complement: Your creativity balanced by their practicality
Connection Score: 94% - Extraordinary cosmic alignment

TIMELINE
Meeting Period: Within next 8-14 months, likely spring/summer
Meeting Place: Educational or cultural setting (bookstore, gallery, workshop)
Relationship Development: Starts as friendship, builds gradually on trust
Key Milestone: Deep commitment within 2-3 years

RECOGNITION SIGNS
Instant Connection: Deep understanding and easy communication
Shared Vision: Similar life goals and values alignment
Peaceful Presence: Feel calm and inspired in their company
Intellectual Bond: Stimulating conversations and mutual respect
Intuitive Knowing: Your heart will recognize them immediately

Keep each section concise and mystical. Use specific details based on the birth information provided.
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
          maxOutputTokens: 1500,
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
    
    // Extract country/region from birth place
    const getRegionalFeatures = (birthPlace) => {
      const place = birthPlace.toLowerCase();
      if (place.includes('india') || place.includes('indian')) {
        return 'South Asian features, warm brown or dark eyes, naturally tanned complexion';
      } else if (place.includes('china') || place.includes('chinese') || place.includes('taiwan') || place.includes('hong kong')) {
        return 'East Asian features, dark eyes, fair to medium complexion';
      } else if (place.includes('japan') || place.includes('japanese')) {
        return 'Japanese features, dark eyes, fair complexion';
      } else if (place.includes('korea') || place.includes('korean')) {
        return 'Korean features, dark eyes, fair complexion';
      } else if (place.includes('africa') || place.includes('nigeria') || place.includes('kenya') || place.includes('ghana')) {
        return 'African features, dark brown eyes, rich dark complexion';
      } else if (place.includes('middle east') || place.includes('iran') || place.includes('iraq') || place.includes('turkey')) {
        return 'Middle Eastern features, dark eyes, olive to medium complexion';
      } else if (place.includes('mexico') || place.includes('spain') || place.includes('latin') || place.includes('hispanic')) {
        return 'Latino/Hispanic features, brown eyes, olive to medium complexion';
      } else if (place.includes('russia') || place.includes('eastern europe') || place.includes('poland') || place.includes('ukraine')) {
        return 'Eastern European features, light to medium eyes, fair complexion';
      } else if (place.includes('scandinavia') || place.includes('norway') || place.includes('sweden') || place.includes('denmark')) {
        return 'Scandinavian features, light eyes, fair complexion';
      } else {
        return 'Mixed heritage features, expressive eyes, medium complexion';
      }
    };

    const prompt = `
Based on these birth details, create a realistic portrait description for ${name}'s astrologically compatible soulmate:

Birth Details:
- Name: ${name}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth}
- Birth Place: ${birthPlace}

Create a description for a natural, realistic pencil sketch portrait considering:

Regional Features: ${getRegionalFeatures(birthPlace)}
Astrological Compatibility: Someone whose appearance reflects complementary cosmic energies
Realistic Appearance: Natural, everyday beauty - not model-like or overly perfect
Age Range: Compatible life stage (late 20s to mid 30s)

Focus on:
- Authentic, natural facial features typical of the region
- Kind, intelligent expression showing depth of character
- Realistic proportions and natural beauty
- Features that suggest compatibility and harmony
- Subtle astrological influences in their overall presence

Format as: "Realistic pencil sketch portrait of a person with [regional features], natural [specific facial details], authentic everyday appearance, kind intelligent expression, [age], drawn in realistic graphite style with natural shading and proportions..."

Keep the description grounded in reality - this should look like a real person you might meet, not an idealized fantasy.
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
          temperature: 0.6,
          topK: 1,
          topP: 1,
          maxOutputTokens: 400,
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

    // Enhance the prompt for realistic pencil sketch style
    const enhancedPrompt = `${imagePrompt}, natural realistic pencil sketch, authentic graphite drawing, realistic proportions, everyday natural beauty, genuine expression, detailed shading, portrait drawing style, not glamorous or model-like, authentic human features, realistic art style, natural lighting, honest portrayal`;

    const response = await fetch(FLUX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FLUX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        guidance_scale: 2.5, // Lower for more natural, less stylized results
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