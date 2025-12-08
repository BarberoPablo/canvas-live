"use client";

export default function Home() {
  const handleRedirect = () => {
    window.location.href = "/canvas";
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Home page</h1>
        <button type="button" onClick={handleRedirect} className="border p-2 text-1xl font-bold cursor-pointer">
          Go to Canvas
        </button>
      </main>
    </div>
  );
}
