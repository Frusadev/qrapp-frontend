import { InfofieldDTO } from "@/lib/api/dto/infofield";
import { buttonVariants } from "../ui/button";

export default function InfofieldPreview({
  infofield,
}: { infofield: InfofieldDTO }) {
  return (
    <div
      className={`${buttonVariants({ variant: "ghost" })}
    flex justify-center py-3 w-full`}
    >
      <span className="text-center select-none">{infofield.name}</span>
    </div>
  );
}
