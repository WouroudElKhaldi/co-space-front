import DashLayout from "@/components/(dashboard)/dashLayout/dashLayout";

export const metadata = {
  title: "CoSpace - Admin Dashboard",
  description: "Your friend for exploring co working spaces",
};

export default function RootLayout({ children }) {
  return (
    <DashLayout admin={true} role={["Admin"]}>
      {children}
    </DashLayout>
  );
}
