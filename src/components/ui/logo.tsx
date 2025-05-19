import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={"/logo.png"}
        className="bg-white rounded-[5px]"
        height={40}
        width={40}
        alt="QRApp logo"
      />
      <span className="font-medium text-xl select-none">QRApp</span>
    </div>
  );
}
