export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Behandle indgående data her. For eksempel, gem det i en database.
    console.log(req.body);
    
    // Send en bekræftelse tilbage til klienten.
    res.status(200).json({ message: 'Besked modtaget!' });
  } else {
    // Håndter kun POST-anmodninger.
    res.status(405).end();
  }
}
