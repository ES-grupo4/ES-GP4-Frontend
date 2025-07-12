import type { ReactElement, ReactNode } from "react";

function Box({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
      {children}
    </div>
  );
}

export default Box;
