import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import ProjectItem from "../../components/projectItem";

import { createClient } from "@/prismicio";
import BackBtn from "@/app/components/BackBtn";

export default async function ProjectList() {
  const client = createClient();
  const projects: any = await client
    .getByType("project_item")
    .catch(() => notFound());
  console.log(projects);
  return (
    <>
      <BackBtn className="m-6 mb-0 fixed"/>
      {projects.results.map((proj: any, index: number) => (
        <ProjectItem
          key={index}
          src={proj.data.main_image}
          src2={proj.data.secondary_image}
          title={proj.data.name}
          description={proj.data.description[0].text}
          index={index}
          slug={proj.uid}
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
