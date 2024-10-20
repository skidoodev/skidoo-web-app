import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";
import { type POST_QUERYResult } from "../../sanity.types";
import Link from "next/link";

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body } = post ?? {};

  return (
    <main className="container prose prose-lg mx-auto p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage?.asset?._ref ? (
        <Image
          className="float-left m-0 mr-4 w-1/3 rounded-lg"
          src={urlFor(mainImage?.asset?._ref).width(300).height(300).url()}
          width={300}
          height={300}
          alt={title ?? ""}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  );
}
