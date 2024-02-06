'use client';

import { usePathname } from 'next/navigation'
import Trend from './Trend'
import styles from './trendsection.module.css'
import { useSession } from 'next-auth/react';
import { Hashtag } from '@/model/Hashtag';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';

export default function TrendSection() {
    const { data: session } = useSession();
    const { data } = useQuery<Hashtag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
        enabled: !!session?.user
    })

    const pathname = usePathname();
    if(pathname === '/explore') {
        return null;
    }
    if(data?.user) {
        return (
            <div className={styles.trendBg}>
                <div className={styles.trend}>
                    <h3>나를 위한 트렌트</h3>
                    {data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)}
                </div>
            </div>
        )
    }
    return (
        <div className={styles.trendBg}>
            <div className={styles.noTrend}>
                트렌드를 가져올 수 없습니다.
            </div>
        </div>
    )
}