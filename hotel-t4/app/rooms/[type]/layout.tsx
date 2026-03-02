export function generateStaticParams() {
  return [{ type: "single" }, { type: "double" }, { type: "family" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
