import { RefObject, useRef } from "react";
import { Input } from "../ui/input";

type ComponentProps = {
  id: string;
  reference: RefObject<HTMLInputElement>;
};

export default function ImageSelector({ id, reference }: ComponentProps) {
  return (
    <div className="grid grid-cols-2">
      <Input
        id={id}
        type="file"
        multiple={false}
        accept="image/png, image/jpeg, image/jpg"
        className="col-span-1"
        ref={reference}
      />
    </div>
  );
}
