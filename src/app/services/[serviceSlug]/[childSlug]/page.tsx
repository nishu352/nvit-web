import { Metadata } from "next";
import { notFound } from "next/navigation";
import ChildServiceDetailView from "@/components/layout/ChildServiceDetailView";
import ServicePageTemplate from "@/components/layout/ServicePageTemplate";
import { SERVICES_CONFIG, SOLUTIONS_CONFIG } from "@/config/siteNavigation";
import { CHILD_SERVICES_DATA } from "@/config/childServicesContent";

interface Props {
  params: Promise<{ serviceSlug: string; childSlug: string }>;
}

export async function generateStaticParams() {
  const params: { serviceSlug: string; childSlug: string }[] = [];
  for (const s of SERVICES_CONFIG) {
    for (const c of s.childRoutes) {
      params.push({
        serviceSlug: s.slug,
        childSlug: c.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, childSlug } = await params;
  const detailedChild = CHILD_SERVICES_DATA[childSlug];

  if (detailedChild) {
    return {
      title: detailedChild.metaTitle,
      description: detailedChild.metaDescription,
      alternates: {
        canonical: `https://www.nvit.space/services/${detailedChild.parentSlug}/${detailedChild.slug}`,
      },
      openGraph: {
        title: detailedChild.metaTitle,
        description: detailedChild.metaDescription,
        url: `https://www.nvit.space/services/${detailedChild.parentSlug}/${detailedChild.slug}`,
      },
    };
  }

  const parent = SERVICES_CONFIG.find((s) => s.slug === serviceSlug);
  const child = parent?.childRoutes.find((c) => c.slug === childSlug);

  if (!parent || !child) return { title: "Service Not Found" };

  return {
    title: `${child.name} — ${parent.name} | NVIT.SPACE`,
    description: child.shortDescription,
    alternates: {
      canonical: `https://www.nvit.space/services/${parent.slug}/${child.slug}`,
    },
    openGraph: {
      title: `${child.name} | NVIT.SPACE`,
      description: child.shortDescription,
      url: `https://www.nvit.space/services/${parent.slug}/${child.slug}`,
    },
  };
}

export default async function ChildServicePage({ params }: Props) {
  const { serviceSlug, childSlug } = await params;
  const detailedChild = CHILD_SERVICES_DATA[childSlug];

  if (detailedChild) {
    return <ChildServiceDetailView service={detailedChild} />;
  }

  const parent = SERVICES_CONFIG.find((s) => s.slug === serviceSlug);
  const child = parent?.childRoutes.find((c) => c.slug === childSlug);

  if (!parent || !child) {
    notFound();
  }

  // Related sibling services
  const siblingCards = parent.childRoutes
    .filter((c) => c.slug !== child.slug)
    .slice(0, 3)
    .map((c) => ({
      title: c.name,
      description: c.shortDescription,
      href: `/services/${parent.slug}/${c.slug}`,
      tag: "Related Specialty",
    }));

  // Cross links
  const relatedLinks = [
    {
      title: `All ${parent.name}`,
      href: `/services/${parent.slug}`,
      type: "Service" as const,
    },
    ...(parent.relatedSolutions || []).slice(0, 2).map((solSlug) => {
      const sol = SOLUTIONS_CONFIG.find((s) => s.slug === solSlug);
      return {
        title: sol ? sol.name : solSlug,
        href: `/solutions/${solSlug}`,
        type: "Solution" as const,
      };
    }),
  ];

  return (
    <ServicePageTemplate
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: parent.name, href: `/services/${parent.slug}` },
        { label: child.name },
      ]}
      badgeText={parent.tag}
      heroTitle={child.heroTitle}
      heroSubtitle={child.heroSubtitle}
      overview={child.overview}
      keyFeatures={child.keyFeatures}
      technologies={child.technologies}
      useCases={child.useCases}
      childCards={siblingCards}
      relatedLinks={relatedLinks}
      ctaTitle={`Build Your ${child.name} Solution`}
      ctaSubtitle={`Consult directly with our engineering team for technical roadmap, timeline, and execution.`}
    />
  );
}
