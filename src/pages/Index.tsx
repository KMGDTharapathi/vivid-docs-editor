
import DocumentEditor from "@/components/DocumentEditor";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold">AI Document Editor</h1>
        </div>
      </header>
      <DocumentEditor />
    </main>
  );
};

export default Index;
