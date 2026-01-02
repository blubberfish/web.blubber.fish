function defineMfe({
  host,
  appPath,
  assetPath,
}: {
  appPath: string;
  assetPath: string;
  host: string;
}): {
  HOST: {
    source: string;
    destination: string;
  }[];
  MFE: {
    assetPrefix: string;
    basePath: string;
  };
} {
  const result: ReturnType<typeof defineMfe> = {
    HOST: [],
    MFE: {
      assetPrefix: assetPath,
      basePath: appPath,
    },
  };
  if (!host) {
    return result;
  }
  const rootUrl = new URL(appPath, host);
  const mfeUrl = new URL(
    [rootUrl.pathname, "/:path+"].join("/").replace(/\/+/g, "/"),
    rootUrl
  );
  const assetUrl = new URL(
    [assetPath, "/:path+"].join("/").replace(/\/+/g, "/"),
    rootUrl
  );
  result.HOST.push(
    { source: rootUrl.pathname, destination: rootUrl.href },
    { source: mfeUrl.pathname, destination: mfeUrl.href },
    { source: assetUrl.pathname, destination: assetUrl.href }
  );
  return result;
}

export const LILYPAD = defineMfe({
  appPath: "/app/lilypad",
  assetPath: "/lilypad-static",
  host: process.env.MFE_LILYPAD_HOST!,
});
