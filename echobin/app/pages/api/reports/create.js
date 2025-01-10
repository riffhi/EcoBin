// /pages/api/reports/create.js
import { createReport } from '../../../lib/action'; // Import the logic to create a report and increment points

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, location, imageUrl } = req.body;

    if (!email || !location || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      await createReport(email, location, imageUrl);  // Call the action function to create report and update points
      res.status(200).json({ message: 'Report created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating report' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
