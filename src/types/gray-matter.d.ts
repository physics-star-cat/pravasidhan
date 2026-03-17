declare module "gray-matter" {
  interface GrayMatterFile {
    data: Record<string, any>;
    content: string;
    excerpt?: string;
    orig: string;
  }

  function matter(input: string, options?: Record<string, any>): GrayMatterFile;
  export default matter;
}
