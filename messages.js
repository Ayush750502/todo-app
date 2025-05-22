export default messages = {
  Validate: {
    Title: {
      Empty: "Title is required!",
      Length: "Title should be at most 30 characters.",
    },
    Description: {
      Empty: "Description is required!",
      Length: "Description should be at most 150 characters.",
    },
    Time: {
      Start: {
        Empty: "Start time is required",
      },
      End: {
        Empty: "End time is required",
        isAfterStart: "End time must be after start time",
      },
    },
  },
  Completed: "✅ Completed",
  Due: "❌ Task is due",
  Empty: "No tasks available. Add one!",
  Alerts: {
    Mark: {
      Title: "Mark as Completed",
      Confirmation: "Are you sure you want to mark this task as completed?",
    },
    Delete: {
      Title: "Delete",
      Confirmation: "Are you sure you want to delete this task?",
    },
  },
};
