export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/teams/57/matches?status=SCHEDULED&limit=10",
      { headers: { "X-Auth-Token": "f71377d63a934283a340d8ada7aed410" } }
    );
    const data = await response.json();
    // Cache at Vercel edge for 12 hours
    res.setHeader("Cache-Control", "s-maxage=43200, stale-while-revalidate=3600");
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch Arsenal matches" });
  }
}
