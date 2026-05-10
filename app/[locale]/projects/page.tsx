import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import ProjectItem from "../../components/projectItem";

import { createClient } from "@/prismicio";

export default async function ProjectList() {
  const client = createClient();
  const project: any = await client
    .getSingle("project")
    .catch(() => notFound());
  return (
    <>
      {project.data.project.map((proj: any, index: number) => (
        <ProjectItem
          key={index}
          src={proj.mainimg}
          src2={proj.secondaryimg}
          title={proj.title}
          description={proj.description[0].text}
          index={index}
        />
      ))}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
