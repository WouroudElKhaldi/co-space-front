import SpaceByCity from "@/components/spaceByCity/spaceByCity";

export default function Page({ params }) {
  return (
    <>
      <SpaceByCity city={params.city} />
    </>
  );
}
