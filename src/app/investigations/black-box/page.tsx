import type { Metadata } from "next";
import { BlackBoxExperience } from "@/components/investigations/BlackBoxExperience";

export const metadata: Metadata = {
  title: "The Black Box — How AI Actually Works",
  description:
    "An interactive investigation into what happens when an AI talks: tokens, probabilities, sampling, and why convincing language is not proof of subjective experience.",
  alternates: { canonical: "/investigations/black-box" },
  openGraph: {
    title: "The Black Box — How AI Actually Works",
    description:
      "Step inside an AI response and watch it get manufactured one token at a time.",
    url: "/investigations/black-box",
  },
};

export default function BlackBoxPage() {
  return <BlackBoxExperience />;
}
