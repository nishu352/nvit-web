import { Metadata } from "next";
import { notFound } from "next/navigation";
import PrimaryServiceDetailView from "@/components/layout/PrimaryServiceDetailView";
import ServicePageTemplate from "@/components/layout/ServicePageTemplate";
import { SERVICES_CONFIG, SOLUTIONS_CONFIG } from "@/config/siteNavigation";
import { PRIMARY_SERVICES_DATA } from "@/config/primaryServicesContent";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_CONFIG.map((s) => ({
    serviceSlug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const detailedService = PRIMARY_SERVICES_DATA[serviceSlug];

  if (detailedService) {
    return {
      title: detailedService.metaTitle,
      description: detailedService.metaDescription,
      alternates: {
        canonical: `https://www.nvit.space/services/${detailedService.slug}`,
      },
      openGraph: {
        title: detailedService.metaTitle,
        description: detailedService.metaDescription,
        url: `https://www.nvit.space/services/${detailedService.slug}`,
      },
    };
  }

  const service = SERVICES_CONFIG.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.name} — Engineering & Solutions | NVIT.SPACE`,
    description: service.shortDescription,
    alternates: {
      canonical: `https://www.nvit.space/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | NVIT.SPACE`,
      description: service.shortDescription,
      url: `https://www.nvit.space/services/${service.slug}`,
    },
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { serviceSlug } = await params;
  const detailedService = PRIMARY_SERVICES_DATA[serviceSlug];

  if (detailedService) {
    return <PrimaryServiceDetailView service={detailedService} />;
  }

  const service = SERVICES_CONFIG.find((s) => s.slug === serviceSlug);
  if (!service) {
    notFound();
  }

  const childCards = service.childRoutes.map((c) => ({
    title: c.name,
    description: c.shortDescription,
    href: `/services/${service.slug}/${c.slug}`,
    tag: "Specialty",
  }));

  const relatedLinks = (service.relatedSolutions || []).map((solSlug) => {
    const sol = SOLUTIONS_CONFIG.find((s) => s.slug === solSlug);
    return {
      title: sol ? sol.name : solSlug,
      href: `/solutions/${solSlug}`,
      type: "Solution" as const,
    };
  });

  return (
    <ServicePageTemplate
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: service.name },
      ]}
      badgeText={service.tag}
      heroTitle={service.heroTitle}
      heroSubtitle={service.heroSubtitle}
      overview={service.overview}
      keyFeatures={service.keyFeatures}
      technologies={service.technologies}
      childCards={childCards}
      relatedLinks={relatedLinks}
      ctaTitle={`Build Your ${service.name} Project`}
      ctaSubtitle={`Discuss timeline, technical stack, and architecture roadmap for your ${service.name} requirement.`}
    />
  );
}
