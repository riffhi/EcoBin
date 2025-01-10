import { NextResponse } from 'next/server';

export async function POST(req) {  
  try {
    console.log('Starting image analysis...');
    
    const formData = await req.formData();
    const image = formData.get('image');
    
    if (!image) {
      // console.log('No image found in request');
      return NextResponse.json(
        { error: 'No image uploaded.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.WORQHAT_API_KEY;
    if (!apiKey) {
      // console.log('API key not found');
      return NextResponse.json(
        { error: 'API key is not configured.' },
        { status: 500 }
      );
    }

    // // Log the image details for debugging
    // console.log('Image file details:', {
    //   name: image.name,
    //   type: image.type,
    //   size: image.size
    // });

    // Create new FormData for Worqhat API
    const worqhatFormData = new FormData();
    worqhatFormData.append('output_type', 'text');
    worqhatFormData.append('training_data', 'Analyze this image and identify if there are any waste materials present. If no waste is visible, clearly state that.');
    worqhatFormData.append('question', 'Are there any waste materials visible in this image? If yes, what types? If no, clearly state that no waste is present.');
    worqhatFormData.append('images', image, image.name); // Added filename
    worqhatFormData.append('randomness', '0.3');

    // console.log('Sending request to Worqhat API...');

    const externalApiResponse = await fetch('https://api.worqhat.com/api/ai/images/v2/image-analysis', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: worqhatFormData,
    });

    if (!externalApiResponse.ok) {
      const errorText = await externalApiResponse.text();
      // console.error('Worqhat API error:', errorText);
      return NextResponse.json(
        { error: `External API Error: ${errorText}` },
        { status: externalApiResponse.status }
      );
    }

    const analysisResult = await externalApiResponse.json();
    // console.log('Received response from Worqhat:', analysisResult);
    // Extract the description from the data field
    const description = analysisResult.data || 'No description available';

    const { wasteCategory, confidence } = analyzeWasteDescription(description);

    return NextResponse.json({
      description: description,
      category: wasteCategory,
      confidence: confidence,
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during analysis: ' + error.message },
      { status: 500 }
    );
  }
}


function analyzeWasteDescription(description) {
  // Keywords for each category
  const categories = {
    biodegradable: [
      'food', 'organic', 'vegetable', 'fruit', 'plant', 'leaves', 'grass', 'garden', 'compost', 'banana', 'apple', 'potato', 'egg shells', 'food scraps', 'vegetable scraps', 'fruit scraps', 'compost', 'fruit peels', 'eat'
    ],
    recyclable: [
      'plastic', 'metal', 'aluminum', 'glass', 'cardboard', 'paper','bottle', 'can', 'container', 'packaging'
    ],
    hazardous: [
      'chemical', 'battery', 'electronic', 'paint', 'oil', 'medical', 'toxic', 'hazardous', 'e-waste', 'pharmaceutical', 'light bulbs', 'batteries', 'electronics'
    ]
  };


  // Non-waste keywords to exclude
  // const nonWasteKeywords = [
  //   'surface', 'table', 'desk', 'furniture', 'working', 
  //   'in use', 'using', 'functional', 'active', 'clean'
  // ];
  // // Check if description contains non-waste keywords
  // const isNonWaste = nonWasteKeywords.some(keyword => 
  //   description.toLowerCase().includes(keyword.toLowerCase())
  // );
  // if (isNonWaste) {
  //   return {
  //     wasteCategory: 'Not Waste',
  //     confidence: 'High'
  //   };
  // }

  let categoryScores = {
    biodegradable: 0,
    recyclable: 0,
    hazardous: 0
  };

  // Convert description to lowercase for matching
  const lowercaseDesc = description.toLowerCase();

  // Calculate scores for each category
  for (const [category, keywords] of Object.entries(categories)) {
    keywords.forEach(keyword => {
      if (lowercaseDesc.includes(keyword.toLowerCase())) {
        categoryScores[category]++;
      }
    });
  }

  // Determine the category with the highest score
  let maxScore = 0;
  let wasteCategory = 'Unknown';

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      wasteCategory = category.charAt(0).toUpperCase() + category.slice(1);
    }
  });

  // Calculate confidence level
  let confidence;
  if (maxScore >= 3) confidence = 'High';
  else if (maxScore >= 1) confidence = 'Medium';
  else confidence = 'Low';

  return {
    wasteCategory, confidence
  };
}