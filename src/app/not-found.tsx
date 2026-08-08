import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/layout/PageIntro";

export default function NotFound() {
  return (
    <PageIntro
      eyebrow="404"
      title="That page isn't here."
      lede="The link may be old, or the page may not have been built yet. Head back to the start and pick up the thread from there."
    >
      <div className="flex flex-col gap-3 pb-20 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/projects" variant="secondary">
          See the projects
        </Button>
      </div>
    </PageIntro>
  );
}
