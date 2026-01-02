function defineMfe({
  host,
  appPath,
  assetPath,
}: {
  appPath: string;
  assetPath: string;
  host: URL;
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
  const rootUrl = new URL(appPath, host);
  const mfeUrl = new URL(
    [rootUrl.pathname, "/:path+"].join("/").replace(/\/+/g, "/"),
    rootUrl
  );
  const assetUrl = new URL(
    [assetPath, "/:path+"].join("/").replace(/\/+/g, "/"),
    rootUrl
  );
  return {
    HOST: [
      { source: rootUrl.pathname, destination: rootUrl.href },
      { source: mfeUrl.pathname, destination: mfeUrl.href },
      { source: assetUrl.pathname, destination: assetUrl.href },
    ],
    MFE: {
      assetPrefix: assetPath,
      basePath: appPath,
    },
  };
}

export const LILYPAD = defineMfe({
  appPath: "/app/lilypad",
  assetPath: "/lilypad-static",
  host: new URL(process.env.MFE_LILYPAD_HOST!),
});
