
import { VerifyPageClient } from "./verify-page-client";

// This tells Next.js that there are no dynamic paths to generate at build time for this route.
// The page will be rendered on the client side when a user visits a URL like /verify/some-token.
export async function generateStaticParams() {
  return [];
}

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  // We pass the token from the server component to the client component via props.
  return <VerifyPageClient token={params.token} />;
}
