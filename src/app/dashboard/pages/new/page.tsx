import NewPageForm from "./NewPageForm";

export default async function NewPagePage() {
  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold">Create a new page</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Give your link-in-bio page a title to get started.
      </p>
      <div className="mt-6 max-w-md">
        <NewPageForm />
      </div>
    </div>
  );
}
