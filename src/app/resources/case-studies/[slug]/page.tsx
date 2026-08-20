import { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailView from "@/components/layout/CaseStudyDetailView";
import { CASE_STUDIES } from "@/config/resourcesContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) return { title: "Case Study Not Found" };

  return {
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    alternates: {
      canonical: `https://www.nvit.space/resources/case-studies/${caseStudy.slug}`,
    },
    openGraph: {
      title: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      url: `https://www.nvit.space/resources/case-studies/${caseStudy.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailView caseStudy={caseStudy} />;
}
