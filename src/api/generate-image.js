import { generateSoulmateImagePrompt, generateSoulmateImage } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData } = req.body;

    if (!userData) {
      return res.status(400).json({ error: 'User data is required' });
    }

    console.log('Generating image for user:', userData.name);

    // Generate image prompt first
    const imagePrompt = await generateSoulmateImagePrompt(userData);
    console.log('Image prompt generated successfully');
    
    // Generate the actual image
    const imageResult = await generateSoulmateImage(imagePrompt);
    console.log('Image generated successfully');
    
    res.status(200).json({
      success: true,
      imageUrl: imageResult.imageUrl,
      prompt: imagePrompt,
      seed: imageResult.seed
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
}

// Increase timeout for this API route
export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '10mb',
    },
    // This only works on Vercel Pro plan, but doesn't hurt to include
    maxDuration: 60, // 60 seconds
  },
}