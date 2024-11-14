import Card_detail from './Card_detail'
import React, { Suspense } from "react";
function Page() {
  return(
    <Suspense>
        <Card_detail />
    </Suspense>
  )
}

export default Page;
