export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      marks: {
        Row: {
          id: string
          marks: Json
          name: string
          promotion: string | null
          section: number
        }
        Insert: {
          id?: string
          marks: Json
          name: string
          promotion?: string | null
          section: number
        }
        Update: {
          id?: string
          marks?: Json
          name?: string
          promotion?: string | null
          section?: number
        }
      }
      promotions: {
        Row: {
          end: number
          id: string
          start: number
        }
        Insert: {
          end: number
          id?: string
          start: number
        }
        Update: {
          end?: number
          id?: string
          start?: number
        }
      }
      users: {
        Row: {
          id: string
          promotion: string | null
          student_id: string
        }
        Insert: {
          id: string
          promotion?: string | null
          student_id: string
        }
        Update: {
          id?: string
          promotion?: string | null
          student_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
