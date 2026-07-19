const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function normalizeDay(day) {
  return String(day).trim().toLowerCase();
}

function createInactiveDayMiddleware(inactiveDays = []) {
  const inactiveDayNames = inactiveDays.map(normalizeDay);

  return function inactiveDayMiddleware(req, res, next) {
    const now = new Date();
    const currentDayName = dayNames[now.getDay()];
    const normalizedDay = normalizeDay(currentDayName);

    req.currentDate = now;
    req.currentDay = currentDayName;

    if (inactiveDayNames.includes(normalizedDay)) {
      const hour = now.getHours();
      let blockedMessage;

      if (normalizedDay === 'friday' && hour >= 12) {
        blockedMessage = 'Access is blocked on Friday from 12:00 PM. Please try again after the weekend.';
      } else if (normalizedDay === 'saturday' && hour < 22) {
        blockedMessage = 'Access is blocked on Saturday until 10:00 PM. Please try again later.';
      }

      if (blockedMessage) {
        return res.status(503).json({
          error: blockedMessage,
          currentDate: now.toISOString(),
        });
      }
    }

    next();
  };
}

module.exports = createInactiveDayMiddleware;
