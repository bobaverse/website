export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const parseViemError = (error: Error | null) => {
  parseViemDetailedError(error);
  if (error) {
    const blockParse = error.message.replace(/\n/g, "~");
    const arr = blockParse.split("~");
    const errStr = arr.find(t => t.startsWith("Error:"));
    if (errStr) {
      return errStr.replace("Error: ", "");
    }
    return arr.length > 0 ? arr[0] : "Unknown Error";
  }
  return "";
};

interface ViemDetailedError {
  contractCall: Record<string, string>,
  details: string,
  docs: string,
  error: string,
  rawCallArguments: Record<string, string>,
  requestBody: Record<string, any>,
  url: string,
  version: string,

  [k: string]: any,
}

export const parseViemDetailedError = (error: Error | null): ViemDetailedError | undefined => {
  if (error) {
    const d: ViemDetailedError = {} as ViemDetailedError;
    const blockParse = error.message.replace(/\n/g, "~").split("~").filter(v => v.trim());
    blockParse.forEach((v, i) => {
      if (i === 0) {
        d.error = v;
      } else {
        const strSplit = v.split(":");
        let rawKey = strSplit.length > 0 ? strSplit[0] : "";
        let value = strSplit.length > 1 ? strSplit.slice(1).join(":") : "";
        if (rawKey.startsWith(" ")) {
          const key = Object.keys(d).pop() || "";
          const subKey = rawKey.trim();
          if (d[key] === "") {
            d[key] = { [subKey]: value.trim() };
          } else {
            (
              d[key] as Record<string, string>
            )[subKey] = value.trim();
          }
        } else {
          const key = rawKey.trim().toLowerCase().split(" ").map((k, index) =>
            index === 0 ? k : k.charAt(0).toUpperCase() + k.slice(1)).join("");
          d[key] = value.trim();
          if (key === "requestBody") {
            d[key] = JSON.parse(value.trim());
          }
        }
      }
    });
    return d;
  }
};
