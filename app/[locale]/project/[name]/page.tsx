import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import Project from "@/app/components/Project";

type Props = {
  params: Promise<{
    locale: string;
    name: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  const { name } = await params;

  const client = createClient();

  const project = await client
    .getByUID("project_item", name)
    .catch(() => notFound());

  return (
    <Project
      src={project.data.main_image}
      title={project.data.name}
      description={project.data.description?.[0]?.text}
      tag={project.data.project_tag}
    />
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { name } = await params;

  const client = createClient();

  const project = await client
    .getByUID("project_item", name)
    .catch(() => notFound());

  return {
    title: project.data.meta_title || project.data.name,
    description: project.data.meta_description,
    openGraph: {
      images: [
        {
          url: asImageSrc(project.data.meta_image) ?? "",
        },
      ],
    },
  };
}