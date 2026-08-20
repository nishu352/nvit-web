import { Metadata } from "next";
import { notFound } from "next/navigation";
import FinanceToolDetailView from "@/components/layout/FinanceToolDetailView";
import { FINANCE_TOOLS_CONFIG } from "@/config/siteNavigation";
import { FINANCE_TOOLS_DATA } from "@/config/financeToolsContent";

interface Props {
  params: Promise<{ toolSlug: string }>;
}

export async function generateStaticParams() {
  return FINANCE_TOOLS_CONFIG.map((t) => ({
    toolSlug: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolSlug } = await params;
  const detailedTool = FINANCE_TOOLS_DATA[toolSlug];

  if (detailedTool) {
    return {
      title: detailedTool.metaTitle,
      description: detailedTool.metaDescription,
      alternates: {
        canonical: `https://www.nvit.space/finance-tools/${detailedTool.slug}`,
      },
      openGraph: {
        title: detailedTool.metaTitle,
        description: detailedTool.metaDescription,
        url: `https://www.nvit.space/finance-tools/${detailedTool.slug}`,
      },
    };
  }

  const tool = FINANCE_TOOLS_CONFIG.find((t) => t.slug === toolSlug);
  if (!tool) return { title: "Calculator Not Found" };

  return {
    title: `${tool.name} — Free Online Calculator | NVIT.SPACE`,
    description: tool.description,
    alternates: {
      canonical: `https://www.nvit.space/finance-tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} | NVIT.SPACE`,
      description: tool.description,
      url: `https://www.nvit.space/finance-tools/${tool.slug}`,
    },
  };
}

export default async function FinanceToolDetailPage({ params }: Props) {
  const { toolSlug } = await params;
  const detailedTool = FINANCE_TOOLS_DATA[toolSlug];

  if (!detailedTool) {
    notFound();
  }

  return <FinanceToolDetailView tool={detailedTool} />;
}
