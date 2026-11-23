import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableContent from "../../../components/PortableContent";
import ArticleNavigation from "../../../components/ArticleNavigation";

export const revalidate = 60;
export function generateStaticParams() { return []; }
