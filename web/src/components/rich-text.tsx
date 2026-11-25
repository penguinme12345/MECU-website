import Image from "next/image";
import { PortableText, type PortableTextComponents, type PortableTextProps } from "next-sanity";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image
          src={urlFor(value).width(1200).auto("format").url()}
          alt={value.alt ?? ""}
          width={1200}
          height={800}
          className="my-8 h-auto w-full rounded-lg"
        />
      ) : null,
  },
};

export function RichText({ value }: { value: PortableTextProps["value"] }) {
  return (
    <div className="prose-mecu space-y-5 text-lg leading-8 text-zinc-800">
      <PortableText value={value} components={components} />
    </div>
  );
}
