import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-screen px-7 text-sm">
      <Component {...pageProps} />;
    </div>
  );
}
