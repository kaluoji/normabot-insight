export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      pd_mex: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          document_id: number | null
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          document_id?: number | null
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          document_id?: number | null
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      pd_peru: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          document_id: number | null
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          document_id?: number | null
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          document_id?: number | null
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      regulatory_documents: {
        Row: {
          created_at: string
          document_number: string | null
          document_title: string
          document_type: string
          effective_date: string | null
          expiration_date: string | null
          id: number
          issuing_authority: string | null
          jurisdiction: string | null
          metadata: Json | null
          official_source: string | null
          original_url: string
          publication_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          document_number?: string | null
          document_title: string
          document_type: string
          effective_date?: string | null
          expiration_date?: string | null
          id?: number
          issuing_authority?: string | null
          jurisdiction?: string | null
          metadata?: Json | null
          official_source?: string | null
          original_url: string
          publication_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          document_number?: string | null
          document_title?: string
          document_type?: string
          effective_date?: string | null
          expiration_date?: string | null
          id?: number
          issuing_authority?: string | null
          jurisdiction?: string | null
          metadata?: Json | null
          official_source?: string | null
          original_url?: string
          publication_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      manual_sync_all_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          chunks_updated: number
          document_id: number
          new_status: string
          old_status: string
        }[]
      }
      match_pd_mex: {
        Args: { match_count?: number; query_embedding: string }
        Returns: {
          content: string
          document_id: number
          document_title: string
          document_type: string
          id: number
          issuing_authority: string
          jurisdiction: string
          metadata: Json
          publication_date: string
          similarity: number
          status: string
          summary: string
          title: string
        }[]
      }
      match_pd_mex_by_cluster: {
        Args: { cluster_id: number; match_count?: number }
        Returns: {
          cluster_similarity: number
          content: string
          document_id: number
          document_title: string
          document_type: string
          id: number
          issuing_authority: string
          jurisdiction: string
          metadata: Json
          publication_date: string
          status: string
          summary: string
          title: string
        }[]
      }
      match_pd_peru: {
        Args: { match_count?: number; query_embedding: string }
        Returns: {
          content: string
          document_id: number
          document_title: string
          document_type: string
          id: number
          issuing_authority: string
          jurisdiction: string
          metadata: Json
          publication_date: string
          similarity: number
          status: string
          summary: string
          title: string
        }[]
      }
      match_pd_peru_by_cluster: {
        Args: { cluster_id: number; match_count?: number }
        Returns: {
          cluster_similarity: number
          content: string
          document_id: number
          document_title: string
          document_type: string
          id: number
          issuing_authority: string
          jurisdiction: string
          metadata: Json
          publication_date: string
          status: string
          summary: string
          title: string
        }[]
      }
      match_site_pages: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      match_site_pages2: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      match_site_pages3: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          chunk_number: number
          content: string
          id: number
          metadata: Json
          similarity: number
          summary: string
          title: string
          url: string
        }[]
      }
      match_uploaded_documents: {
        Args: {
          chat_id: string
          filter?: Json
          match_count?: number
          query_embedding: string
        }
        Returns: {
          content: string
          filename: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      upsert_regulatory_document: {
        Args: {
          p_document_number?: string
          p_document_title: string
          p_document_type: string
          p_effective_date?: string
          p_issuing_authority?: string
          p_jurisdiction?: string
          p_metadata?: Json
          p_official_source?: string
          p_original_url: string
          p_publication_date?: string
          p_status?: string
        }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
