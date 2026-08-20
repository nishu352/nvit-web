import { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailView from "@/components/layout/SolutionDetailView";
import ServicePageTemplate from "@/components/layout/ServicePageTemplate";
import { SOLUTIONS_CONFIG } from "@/config/siteNavigation";
import { SOLUTIONS_DATA } from "@/config/solutionsContent";

interface Props {
  params: Promise<{ solutionSlug: string }>;
}

export async function generateStaticParams() {
  return SOLUTIONS_CONFIG.map((s) => ({
    solutionSlug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solutionSlug } = await params;
  const detailedSolution = SOLUTIONS_DATA[solutionSlug];

  if (detailedSolution) {
    return {
      title: detailedSolution.metaTitle,
      description: detailedSolution.metaDescription,
      alternates: {
        canonical: `https://www.nvit.space/solutions/${detailedSolution.slug}`,
      },
      openGraph: {
        title: detailedSolution.metaTitle,
        description: detailedSolution.metaDescription,
        url: `https://www.nvit.space/solutions/${detailedSolution.slug}`,
      },
    };
  }

  const solution = SOLUTIONS_CONFIG.find((s) => s.slug === solutionSlug);
  if (!solution) return { title: "Solution Not Found" };

  return {
    title: `${solution.name} — Architecture & Systems | NVIT.SPACE`,
    description: solution.shortDescription,
    alternates: {
      canonical: `https://www.nvit.space/solutions/${solution.slug}`,
    },
    openGraph: {
      title: `${solution.name} | NVIT.SPACE`,
      description: solution.shortDescription,
      url: `https://www.nvit.space/solutions/${solution.slug}`,
    },
  };
}

export default async function IndustrySolutionPage({ params }: Props) {
  const { solutionSlug } = await params;
  const detailedSolution = SOLUTIONS_DATA[solutionSlug];

  if (detailedSolution) {
    return <SolutionDetailView solution={detailedSolution} />;
  }

  const solution = SOLUTIONS_CONFIG.find((s) => s.slug === solutionSlug);
  if (!solution) {
    notFound();
  }

  // Sibling solutions
  const siblingCards = SOLUTIONS_CONFIG.filter((s) => s.slug !== solution.slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.name,
      description: s.shortDescription,
      href: `/solutions/${s.slug}`,
      tag: s.badge,
    }));

  const relatedLinks = solution.connectedServices.map((cs) => ({
    title: cs.name,
    href: cs.href,
    type: "Service" as const,
  }));

  return (
    <ServicePageTemplate
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: solution.name },
      ]}
      badgeText={solution.badge}
      heroTitle={solution.heroTitle}
      heroSubtitle={solution.heroSubtitle}
      overview={solution.overview}
      keyFeatures={solution.coreCapabilities}
      technologies={solution.technologies}
      useCases={solution.challengesSolved}
      childCards={siblingCards}
      relatedLinks={relatedLinks}
      ctaTitle={`Architect Your ${solution.name} Platform`}
      ctaSubtitle={`Discuss timeline, technical stack, and architecture roadmap for your ${solution.name} solution.`}
    />
  );
}
