import DashLayout from "@/components/(dashboard)/dashLayout/dashLayout";

export const metadata = {
  title: "CoSpace - Common Dashboard",
  description: "Your friend for exploring co working spaces",
};

export default function RootLayout({ children }) {
  return <DashLayout role={["Admin", "Manager"]}>{children}</DashLayout>;
}
