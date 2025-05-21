import { ReactNode } from "react";

export default function Show({
  _if,
  _else,
  children,
}: { _if: boolean; _else?: ReactNode; children: ReactNode }) {
  if (_if) {
    return children;
  } else return _else;
}
