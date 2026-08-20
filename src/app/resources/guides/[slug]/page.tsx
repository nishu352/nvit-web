import { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDetailView from "@/components/layout/GuideDetailView";
import { PILLAR_GUIDES } from "@/config/resourcesContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PILLAR_GUIDES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = PILLAR_GUIDES[slug];

  if (!guide) return { title: "Guide Not Found" };

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://www.nvit.space/resources/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://www.nvit.space/resources/guides/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = PILLAR_GUIDES[slug];

  if (!guide) {
    notFound();
  }

  return <GuideDetailView guide={guide} />;
}
