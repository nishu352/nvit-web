import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";

export interface WebsiteCMSData {
  hero?: {
    title?: string;
    subtitle?: string;
  };
  brand?: {
    logoUrl?: string;
    themeColor?: string;
    supportEmail?: string;
    supportPhone?: string;
  };
  about?: {
    vision?: string;
    mission?: string;
    description?: string;
  };
  company?: {
    name?: string;
    tagline?: string;
    address?: string;
    city?: string;
    state?: string;
    cin?: string;
    gst?: string;
    website?: string;
  };
  founders?: {
    founder?: {
      name?: string;
      title?: string;
      bio?: string;
      linkedin?: string;
    };
    coFounder?: {
      name?: string;
      title?: string;
      bio?: string;
      linkedin?: string;
    };
  };
}

export function useWebsiteCMS() {
  return useQuery<WebsiteCMSData>({
    queryKey: ["website-cms", "published"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/cms/published");
        return res.data?.data || {};
      } catch (err) {
        console.warn("Failed to load published CMS data, using default fallbacks:", err);
        return {};
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
