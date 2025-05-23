"use client";
import { InfofieldDTO } from "@/lib/api/dto/infofield";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRef } from "react";

export interface InfofieldSelectProps {
  infofield: InfofieldDTO;
  selected: boolean;
}

export default function InfofieldSelect({
  infofield: infofieldProps,
}: { infofield: InfofieldSelectProps }) {
  const selectRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div
      className="flex gap-2 transition-colors w-full hover:bg-muted
                    py-2 px-2 rounded-sm"
      onClick={() => selectRef.current?.click()}
    >
      <Checkbox
        id={infofieldProps.infofield.field_id}
        ref={selectRef}
        onCheckedChange={(state) => {
          infofieldProps.selected = Boolean(state.valueOf());
        }}
        className="z-10"
        onClick={(e) => {e.stopPropagation()}}
      />
      <Label htmlFor={infofieldProps.infofield.field_id}>
        {infofieldProps.infofield.name}
      </Label>
    </div>
  );
}
