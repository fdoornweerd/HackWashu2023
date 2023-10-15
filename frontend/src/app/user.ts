export interface User {
    user_id: number; // Corresponds to the 'user_id' column
    age: number | null; // Corresponds to the 'age' column
    proficient_languages: string[] | null; // Corresponds to the 'proficient_languages' column
    learning_languages: string[] | null; // Corresponds to the 'learning_languages' column
    interests: string[] | null; // Corresponds to the 'interests' column
    email: string | null; // Corresponds to the 'email' column
    first_name: string | null;
    last_name: string | null;
  }
  