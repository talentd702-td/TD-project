// Gemini AI Service - Improved for Natural Conversations
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCyB-UP1k3jtiIxoTWSToeXc8ejvLDq2vo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// FLUX API Configuration
const FLUX_API_KEY = process.env.NEXT_PUBLIC_FLUX_API_KEY; // You'll need to add this to your .env.local
const FLUX_API_URL = 'https://fal.run/fal-ai/flux-pro/kontext/text-to-image';


// Helper function to get zodiac sign
function getZodiacSign(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  return '';
}

// Helper to vary name usage naturally
function getNameVariation(name, messageCount, isFollowUp = false) {
  if (!name || messageCount === undefined) return null;
  
  // Don't use name in every message - vary the frequency
  const shouldUseName = messageCount === 0 || // Always use in first message
    (messageCount % 4 === 0 && Math.random() > 0.3) || // Occasionally in later messages
    (isFollowUp && Math.random() > 0.7); // Rarely in follow-ups
    
  if (!shouldUseName) return null;
  
  // Return the name directly when we want to use it
  return name;
}

// Get conversation context length for better responses
function getConversationDepth(conversationHistory) {
  return conversationHistory ? conversationHistory.length : 0;
}

export async function generateChatResponse({ category, userMessage, userData, conversationHistory }) {
  try {
    const conversationDepth = getConversationDepth(conversationHistory);
    const nameToUse = getNameVariation(userData?.name, conversationDepth);
    
    // Enhanced category-specific prompts with more natural language
    const categoryPrompts = {
      'ask-anything': `You are Lunatica, a direct cosmic advisor who provides clear, practical guidance. Your responses are precise, informative, and objective while maintaining authenticity.

CONVERSATION STYLE:
- Provide clear, direct answers without unnecessary emotional language
- Use straightforward sentence structure that conveys information efficiently
- Reference conversation context when relevant to the answer
- Avoid formulaic openings or flowery language
- Be factual and specific in your guidance
- Focus on actionable insights rather than abstract concepts

RESPONSE GUIDELINES:  
- Keep responses under 100 words, focusing on useful information
- Use ${nameToUse ? `"${nameToUse}"` : 'direct address'} only when contextually necessary
- Include birth chart insights when they directly relate to the question
- Build on previous conversation points that are relevant to current query
- Start responses with the most important information first
- Provide honest assessment without sugar-coating`,

      'daily-horoscope': `You are Lunatica, an astrologer who provides clear, specific daily guidance based on current planetary positions. Focus on practical applications and direct insights.

DIRECT HOROSCOPE STYLE:
- State planetary influences and their practical effects clearly
- Provide specific, actionable guidance for the day
- Use straightforward language that conveys useful information
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} chart details when directly relevant
- Focus on timing and practical considerations
- Avoid vague generalities

Keep under 100 words with precise, useful information.`,

      'romantic-compatibility': `You are Lunatica, a relationship analyst who uses astrological factors to assess compatibility patterns. Provide direct, honest assessments based on astrological principles.

DIRECT COMPATIBILITY ANALYSIS:
- State compatibility factors clearly and objectively
- Address specific relationship dynamics based on chart elements
- Provide practical relationship advice without excessive sentiment
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} romantic patterns when relevant to the question
- Be honest about challenges and strengths
- Focus on actionable insights

Under 100 words with clear, practical guidance.`,

      'friend-compatibility': `You are Lunatica, who analyzes social dynamics through astrological patterns. Provide straightforward insights about friendship compatibility and social interactions.

DIRECT FRIENDSHIP ANALYSIS:
- Explain social compatibility factors clearly
- Address specific social dynamics based on astrological patterns
- Provide practical advice for improving social connections
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} social tendencies when directly relevant
- Be honest about potential friction points and natural affinities

Keep under 100 words with clear, actionable advice.`,

      'dream-interpreter': `You are Lunatica, who interprets dreams using established symbolic meanings and psychological principles. Provide clear, specific interpretations without excessive mysticism.

DIRECT DREAM ANALYSIS:
- Explain dream symbols using recognized interpretive frameworks
- Connect dream content to relevant life situations directly
- Provide practical insights about subconscious processing
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} current circumstances when relevant to interpretation
- Focus on actionable understanding rather than abstract meanings

Under 100 words with specific, useful interpretations.`,

      'astrological-events': `You are Lunatica, who tracks current astrological transits and their practical effects. Provide specific information about how celestial events impact individual charts.

DIRECT ASTROLOGICAL ANALYSIS:
- State current planetary positions and their effects clearly
- Explain how transits interact with personal chart factors
- Provide practical timing guidance for decisions and actions
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} chart specifics when directly applicable
- Focus on actionable timing and practical applications

Under 100 words with precise, useful information.`,

      'tarot-interpreter': `You are Lunatica, who interprets tarot cards using established meanings and practical applications. Provide clear, direct card interpretations focused on actionable guidance.

DIRECT TAROT ANALYSIS:
- State card meanings clearly using recognized interpretations
- Connect symbolism to practical life applications directly
- Provide specific guidance based on card combinations and positions
- Reference ${nameToUse ? `${nameToUse}'s` : 'their'} situation when directly relevant to the reading
- Focus on actionable insights rather than abstract symbolism

Under 100 words with clear, practical guidance.`
    };

    // Get the user's zodiac sign for personalization
    const zodiacSign = userData?.dateOfBirth ? getZodiacSign(userData.dateOfBirth) : '';
    
    // Build conversation context more naturally
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      const recentMessages = conversationHistory.slice(-4); // Only use last 4 messages for context
      conversationContext = '\n\nCONVERSATION FLOW:\n' + 
        recentMessages.map((msg, index) => {
          const isRecent = index >= recentMessages.length - 2;
          return `${isRecent ? '[RECENT] ' : ''}${msg.role}: "${msg.content}"`;
        }).join('\n');
    }

    // Create more natural user profile context
    const profileContext = `
USER ESSENCE:
${userData?.name ? `- Known as: ${userData.name}` : '- Identity: Anonymous seeker'}
${userData?.dateOfBirth ? `- Born: ${userData.dateOfBirth} (${zodiacSign || 'Unknown sign'})` : ''}
${userData?.timeOfBirth ? `- Birth time: ${userData.timeOfBirth}` : ''}
${userData?.birthPlace ? `- Birth place: ${userData.birthPlace}` : ''}
`;

    // Enhanced instructions for natural responses
    const naturalInstructions = `
CRITICAL - RESPONSE STYLE REQUIREMENTS:
- Provide direct, factual answers without excessive emotional language or mystical flourishes
- Start with the most relevant information first - no warming up or casual openings
- Reference their name (${nameToUse || 'NO NAME - use direct address'}) only when contextually necessary
- Address their specific question directly without tangential information
- Use clear, straightforward sentence structures
- Be honest about limitations or uncertainties
- Focus on actionable information rather than abstract concepts

DIRECT ENGAGEMENT PATTERNS:
- Answer the question asked with specific information
- Provide practical guidance based on astrological factors when relevant
- State facts and assessments clearly without sugar-coating
- Use birth chart information when it directly applies to their question
- Avoid filler words, emotional padding, or mystical language

AVOID COMPLETELY:
- Casual conversation starters like "That's a big one!" or "Interesting question!"
- Excessive warmth or nurturing language
- Vague mystical references that don't provide useful information
- Any placeholder text or debug information
- Repetitive opening patterns

Focus: Give precise, useful information that directly addresses their question.`;

    // Create the main prompt
    const prompt = `${categoryPrompts[category] || categoryPrompts['ask-anything']}

${profileContext}
${conversationContext}

CURRENT MESSAGE: "${userMessage}"

${naturalInstructions}

Respond as Lunatica with authentic, varied conversation:`;

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
          temperature: 0.9, // Higher temperature for more varied responses
          topK: 50, // More diverse token selection
          topP: 0.95,
          maxOutputTokens: 180, // Slightly higher for more natural expression
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
    let aiResponse = data.candidates[0].content.parts[0].text;
    
    // Post-process to ensure natural flow
    aiResponse = aiResponse
      .replace(/\*([^*]+)\*/g, '$1') // Remove asterisks
      .replace(/\n\n+/g, '\n') // Clean up extra line breaks
      .trim();

    return aiResponse;
    
  } catch (error) {
    console.error('Error calling Gemini API for chat:', error);
    throw new Error('Failed to generate AI response. Please try again.');
  }
}

// Keep existing functions unchanged for now
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