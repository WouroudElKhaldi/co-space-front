import Image from "next/image";

export default function Loading({ height, width }) {
  return (
    <div
      style={{
        height: height ? height : "100vh",
        width: width ? width : "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image width={400} height={200} src="/loading1.svg" alt="loading" />
    </div>
  );
}
