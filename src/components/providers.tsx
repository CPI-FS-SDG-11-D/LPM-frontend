import { BrowserRouter } from "react-router-dom";

export default function UtilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
