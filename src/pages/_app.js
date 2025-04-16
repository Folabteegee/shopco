import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-screen px-7 items-left text-sm">
      <Component {...pageProps} />
    </div>
  );
}
