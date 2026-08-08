import type { Metadata } from "next";
import { BlackBoxExperience } from "@/components/investigations/BlackBoxExperience";

const title = "The Black Box — How AI Actually Works";
const description =
  "Step inside an AI response and watch it get manufactured one token at a time.";

export const metadata: Metadata = {
  title,
  description:
    "An interactive investigation into what happens when an AI talks: tokens, probabilities, sampling, and why convincing language is not proof of subjective experience.",
  alternates: { canonical: "/investigations/black-box" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/investigations/black-box",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlackBoxPage() {
  return <BlackBoxExperience />;
}
