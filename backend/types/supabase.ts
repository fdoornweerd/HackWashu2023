export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          created_at: string
          id: number
          password: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          password: string
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          password?: string
          username?: string
        }
        Relationships: []
      }
      user_info: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          id: number
          interests: string[] | null
          learning_languages: string[] | null
          proficient_languages: string[] | null
          user_id: number
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          id?: number
          interests?: string[] | null
          learning_languages?: string[] | null
          proficient_languages?: string[] | null
          user_id: number
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          id?: number
          interests?: string[] | null
          learning_languages?: string[] | null
          proficient_languages?: string[] | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_info_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_recommendations: {
        Args: {
          userid: number
        }
        Returns: {
          user_id_2: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
