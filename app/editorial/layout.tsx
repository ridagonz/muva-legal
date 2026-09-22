import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial y publicaciones",
  description: "Libros, documentos académicos y guías jurídicas de MUVA Legal.",
};

export default function EditorialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
