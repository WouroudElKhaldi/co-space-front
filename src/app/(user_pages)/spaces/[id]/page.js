import SingleSpace from "@/components/singleSpace/singleSpace";

export default function page({ params }) {
  return (
    <div>
      <SingleSpace id={params.id} />
    </div>
  );
}
