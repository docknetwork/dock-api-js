import { DIDActionButtons } from "@/components/did-action-buttons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
     
        <h1 className="text-4xl font-bold">
          Welcome to the Dock SDK Next.js example
        </h1>
        <p className="text-xl mt-8">
          This is a simple example of how to use the Dock SDK with Next.js.
        </p>
      <div className="space-y-3 mt-8">
        <DIDActionButtons />
        </div>

    </div>
  );
}
