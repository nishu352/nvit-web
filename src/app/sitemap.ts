import { MetadataRoute } from "next";
import {
  SERVICES_CONFIG,
  SOLUTIONS_CONFIG,
  FINANCE_TOOLS_CONFIG,
} from "@/config/siteNavigation";
import {
  BLOG_ARTICLES,
  PILLAR_GUIDES,
  CASE_STUDIES,
} from "@/config/resourcesContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.nvit.space";
  const lastModified = new Date();

  // Core Static Hubs
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/finance-tools`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/company-check`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pincode-check`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/resources/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/resources/guides`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/resources/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 6 Primary Service Categories
  const serviceCategoryRoutes: MetadataRoute.Sitemap = SERVICES_CONFIG.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 30 Child Service Routes
  const childServiceRoutes: MetadataRoute.Sitemap = [];
  for (const s of SERVICES_CONFIG) {
    for (const c of s.childRoutes) {
      childServiceRoutes.push({
        url: `${baseUrl}/services/${s.slug}/${c.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // 7 Industry Solution Routes
  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS_CONFIG.map((sol) => ({
    url: `${baseUrl}/solutions/${sol.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 7 Finance Tools Routes
  const toolRoutes: MetadataRoute.Sitemap = FINANCE_TOOLS_CONFIG.map((t) => ({
    url: `${baseUrl}/finance-tools/${t.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 12 Blog Article Routes
  const blogRoutes: MetadataRoute.Sitemap = Object.keys(BLOG_ARTICLES).map((slug) => ({
    url: `${baseUrl}/resources/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 4 Pillar Guide Routes
  const guideRoutes: MetadataRoute.Sitemap = Object.keys(PILLAR_GUIDES).map((slug) => ({
    url: `${baseUrl}/resources/guides/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 3 Case Study Routes
  const caseStudyRoutes: MetadataRoute.Sitemap = Object.keys(CASE_STUDIES).map((slug) => ({
    url: `${baseUrl}/resources/case-studies/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceCategoryRoutes,
    ...childServiceRoutes,
    ...solutionRoutes,
    ...toolRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...caseStudyRoutes,
  ];
}
