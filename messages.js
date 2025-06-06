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
    Login: {
      email: {
        email: "Invalid email",
        length: "Email cannot exceed 50 characters",
      },
      password: {
        minLength: "Your password too short!",
        maxLength: "Password cannot exceed 20 characters",
      },
    },
    SignUp: {
      email: {
        email: "Invalid email",
        length: "Email cannot exceed 50 characters",
      },
      password: {
        minLength: "Your password too short!",
        maxLength: "Password cannot exceed 20 characters",
        charaterSpecification:
          "Password must contain at least one uppercase, one lowercase, one digit, and one special character",
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
    SignUp: {
      UserFound: {
        Title: "Error",
        message: "User already exists!",
      },
      Success: {
        Title: "Success",
        message: "Account created! Please log in.",
      },
      Error: {
        Title: "Error",
        message: "Something went wrong.",
      },
    },
    Login: {
      Failed: {
        Title: "Login Failed",
        message: "Invalid email or password",
      },
      Error: {
        Title: "Error",
        message: "Something went wrong.",
      },
    },
    LogOut: {
      Title: "Logout",
      Confirmation: "Are you sure you want to log out?",
    },
  },
};
