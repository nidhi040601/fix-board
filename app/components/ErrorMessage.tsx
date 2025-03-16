import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  console.log(children);
  if (!children) return null;

  return (
    <Text color="red" as="p" className="py-2">
      {children}
    </Text>
  );
};

export default ErrorMessage;
