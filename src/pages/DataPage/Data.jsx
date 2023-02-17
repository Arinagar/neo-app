import { Helmet } from "react-helmet-async";

import DataPage from "../../components/DataPage/DataPage";

export default function Data() {
  return (
    <div>
      <Helmet>
        <title>Data</title>
      </Helmet>
      <DataPage />
    </div>
  );
}
