import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { isFilled } from "@prismicio/client";
import { Anim } from "../components/anim";
import PresPage from "../pages/presPage";

// export default async function Page() {
//   const client = createClient();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const page: any = await client.getSingle("home").catch(() => notFound());

//   return (
//     <>
//       <h1>{page?.data.title}</h1>
//       <PrismicRichText field={page?.data.description}/>
//       <Anim/>
//       {isFilled.contentRelationship(page?.data.highlighted_project.data) && (
//         <section>
//           <h1>Projet mis en avant : </h1>
//           <h2>{page?.data.highlighted_project.data.title}</h2>
//           <PrismicRichText field={page?.data.highlighted_project.data.description}/>
//         </section> )
//       }

//       <SliceZone slices={page?.data.slices} components={components} />
//     </>
//   );
// }

export default async function Page() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page: any = await client.getSingle("home").catch(() => notFound());
  const project: any = await client
    .getSingle("project")
    .catch(() => notFound());

  return (
    <>
      <PresPage
        imgArray={project?.data.project}
        pictureOfMe={page?.data.pictureOfMe}
        highlightedProjectImg={page?.data.highlightProjectImg}
      />
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
