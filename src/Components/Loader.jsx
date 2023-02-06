import React from "react";

import { Pulsar } from "@uiball/loaders";

export const Loader = () => {
  return(
  <div className="container-loader">
    <Pulsar size={60} speed={1.75} color="red" />
  </div>);
};
