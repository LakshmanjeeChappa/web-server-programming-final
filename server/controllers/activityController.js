let activities = [];
let idCounter = 1;

// ADD
async function addActivity(req, res) {
  const { type, duration, date } = req.body;

  const newActivity = {
    id: idCounter++,
    user_id: 1,
    type,
    duration,
    date
  };

  activities.push(newActivity);

  res.json(newActivity);
}

// GET
async function getMyActivities(req, res) {
  res.json(activities);
}

// UPDATE
async function updateActivity(req, res) {
  const id = Number(req.params.id);

  const activity = activities.find(a => a.id === id);
  if (activity) {
    Object.assign(activity, req.body);
  }

  res.json({ message: "Updated" });
}

// DELETE
async function deleteActivity(req, res) {
  const id = Number(req.params.id);

  activities = activities.filter(a => a.id !== id);

  res.json({ message: "Deleted" });
}

// FRIENDS
async function getFriendsActivities(req, res) {
  res.json([]);
}

module.exports = {
  addActivity,
  getMyActivities,
  updateActivity,
  deleteActivity,
  getFriendsActivities
};