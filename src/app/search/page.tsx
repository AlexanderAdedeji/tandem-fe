import { Suspense } from "react";
import { SearchScreen } from "./SearchScreen";

const SearchPage = () => {
  <Suspense fallback={<div className="p-4">Loading search...</div>}>
  <SearchScreen />
  </Suspense>;
};

export default SearchPage;
