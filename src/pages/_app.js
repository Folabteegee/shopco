import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-screen text-sm">
      <Component {...pageProps} />;
    </div>
  );
}
