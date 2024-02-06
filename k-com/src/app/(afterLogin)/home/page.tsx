import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import Post from '../_component/Post'
import PostForm from './_component/PostForm'
import Tab from './_component/Tab'
import TabProvider from './_component/TabProvider'
import styles from './home.module.css'
import { getPostRecommends } from './_lib/getPostRecommends'
import PostRecommends from './_component/PostRecommends'
import TabDecider from './_component/TabDecider'

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
  // 서버에서 온 데이터를 클라이언트에서 형식 그대로 맞춰서 받는 것을 의미
  const dehydratedState = dehydrate(queryClient);
    return (
      <main className={styles.main}>
        <HydrationBoundary state={dehydratedState}>
          <TabProvider>
              <Tab />
              <PostForm />
              <TabDecider />
          </TabProvider>
        </HydrationBoundary>
      </main>
    )
  }