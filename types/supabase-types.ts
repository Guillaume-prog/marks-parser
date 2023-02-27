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
          exam_type: string | null
          id: string
          marks: Json
          promotion: string
          subject_id: string
        }
        Insert: {
          exam_type?: string | null
          id?: string
          marks: Json
          promotion: string
          subject_id: string
        }
        Update: {
          exam_type?: string | null
          id?: string
          marks?: Json
          promotion?: string
          subject_id?: string
        }
      }
      mcc: {
        Row: {
          id: string
          mcc: Json
          semester: number
        }
        Insert: {
          id: string
          mcc: Json
          semester: number
        }
        Update: {
          id?: string
          mcc?: Json
          semester?: number
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
