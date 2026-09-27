import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/services",
        "/services/*",
        "/solutions",
        "/solutions/*",
        "/finance-tools",
        "/finance-tools/*",
        "/company-check",
        "/pincode-check",
        "/resources",
        "/resources/*",
        "/about",
        "/projects",
        "/contact",
        "/privacy-policy",
        "/terms",
        "/disclaimer",
        "/cookie-policy",
      ],
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/auth/",
        "/loan-apply",
        "/internal/",
        "/test/",
        "/debug/",
      ],
    },
    sitemap: "https://www.nvit.space/sitemap.xml",
  };
}
