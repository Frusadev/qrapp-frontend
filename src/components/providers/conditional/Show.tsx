import { ReactNode } from "react";

export default function Show({
  _if,
  children,
}: { _if: boolean; children: ReactNode }) {
  if (_if) {
    return children;
  } else return null;
}
