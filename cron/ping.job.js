import cron from "node-cron";
// If Node >= 18, fetch is global → you can remove this import

const TARGET_URL = "http://localhost:5002/api/expensive/health";
// 👆 change to any endpoint you want to hit

export const startPingJob = () => {
  // Runs every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      const res = await fetch(TARGET_URL);
      console.log(`[CRON] Pinged ${TARGET_URL} → Status: ${res.status}`);
    } catch (error) {
      console.error("[CRON] Ping failed:", error.message);
    }
  });

  console.log("✅ Cron job started (every 10 minutes)");
};
