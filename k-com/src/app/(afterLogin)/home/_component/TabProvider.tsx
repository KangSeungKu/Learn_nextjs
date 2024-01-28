"use client";

import { ReactNode, createContext, useState } from "react";

// 요즘 잘 사용하지 않음...
export const TabContext = createContext({
    tab: 'rec',
    setTab: (value: 'rec' | 'fol') => {},
})

type Props = { children: ReactNode }
export default function TabProvider({ children }: Props) {
    const [tab, setTab] = useState('rec');

    return (
        // 최적화가 필요하지만, 성능이 떨어졌을 때 진행해도 무관
        <TabContext.Provider value={{tab, setTab}}>
            {children}
        </TabContext.Provider>
    )
}