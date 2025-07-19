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
        required: "Email is required",
        length: "Too long! Email cannot exceed 50 characters",
      },
      password: {
        minLength: "Your password too short!",
        maxLength: "Password cannot exceed 20 characters",
        required: "Password is required",
      },
    },
    SignUp: {
      name: {
        required: "Name is required",
        characterSpecification: "Name must contain only letters and spaces",
        maxLength: "Too long! Name cannot exceed 30 characters",
        minLength: "Name must be at least 2 characters long",
      },
      email: {
        email: "Invalid email",
        length: "Email cannot exceed 50 characters",
        required: "Email is required",
      },
      password: {
        minLength: "Your password too short!",
        maxLength: "Password cannot exceed 20 characters",
        charaterSpecification:
          "Password must contain at least one uppercase, one lowercase, one digit, and one special character",
        required: "Password is required",
      },
      confirmPassword: {
        required: "Confirm password is required",
        match: "Passwords must match",
      },
    },
    userPanel: {
      mobile: {
        required: "Mobile number is required",
        length: "Mobile number must be 10 digits starting with 6-9",
      },
      countryCode: {
        required: "Country code is required",
        format: "Enter a valid country code (e.g., +91)",
      },
      address: {
        required: "Address is required",
        length: "Address must be at least 5 characters long",
      },
      dob: {
        required: "Date of birth is required",
        max: "Date of birth cannot be in the future",
        format: "Date of birth must be in the format DD/MM/YYYY",
      },
    },
    changePassword: {
      newPassword: {
        notMatches: "New password must be different from old password",
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
    pickImage: {
      permission: {
        message:
          "Permission Denied: You need to allow camera access to take a photo.",
      },
    },
    updateProfile: {
      Success: {
        Title: "Profile Updated",
        message: "Your profile has been successfully updated.",
      },
      Error: {
        Title: "Error",
        message: "Failed to update profile. Please try again.",
      },
    },
    changePassword: {
      Success: {
        Title: "Password Changed",
        message: "Your password has been successfully changed.",
      },
      User: {
        Title: "User Not Found",
        message: "No user is currently logged in.",
      },
      oldPassword: {
        Title: "Error",
        message: "Old password is incorrect.",
      },
      Error: {
        Title: "Error",
        message: "Failed to change password. Please try again.",
      },
    },
  },
};
