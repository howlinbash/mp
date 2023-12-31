import { type AppType } from "next/app";
import React from "react";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default api.withTRPC(MyApp);
