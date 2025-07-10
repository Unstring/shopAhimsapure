import { type ReactNode } from "react"

export function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl font-bold mb-6">{children}</h1>
}
