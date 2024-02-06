"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({children}: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {  // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false, // internet 연결이 끊겼다가 다시 가져올 때,
          retry: false, // 실패를 할 경우 몇 번 재시도 하도록 설정 (false: 사용안함)
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
        {/* Provider의 장점 - reactQuery data를 서로 공유할 수 있게 됨. */}
      {children}
      {/* dev모드일 때만 사용하도록 수정 */}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local' }/>
    </QueryClientProvider>
  );
}

export default RQProvider;