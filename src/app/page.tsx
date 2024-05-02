import CreateForm from "@/components/shared/CreateForm";
import Introduction from "@/components/shared/Introduction";

export default async function Home() {
  return (
    <>
      <Introduction />
      <CreateForm />
    </>
  );
}
