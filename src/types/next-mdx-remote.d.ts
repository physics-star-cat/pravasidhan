declare module "next-mdx-remote/rsc" {
  import { ReactElement, ComponentType } from "react";

  interface CompileMDXOptions {
    source: string;
    options?: {
      parseFrontmatter?: boolean;
      scope?: Record<string, unknown>;
      mdxOptions?: {
        remarkPlugins?: unknown[];
        rehypePlugins?: unknown[];
      };
    };
    components?: Record<string, ComponentType<any>>;
  }

  interface CompileMDXResult<TFrontmatter = Record<string, unknown>> {
    content: ReactElement;
    frontmatter: TFrontmatter;
  }

  export function compileMDX<TFrontmatter = Record<string, unknown>>(
    options: CompileMDXOptions
  ): Promise<CompileMDXResult<TFrontmatter>>;

  export function MDXRemote(props: CompileMDXOptions): Promise<ReactElement>;
}
