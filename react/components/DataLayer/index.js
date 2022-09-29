import React, { useEffect, useLayoutEffect } from 'react'
import { useQuery } from 'react-apollo'
import getSession from '../../queries/getSession.gql'
import { Query, useLazyQuery } from 'react-apollo'

const DataLayer = () => {
    const [fetchSession, { data: session, loading: sessionLoading }] = useLazyQuery(getSession)

    useEffect(() => {
        fetchSession()
    }, [])

    useEffect(() => {
        if (session && session.profile != null) {
            console.log("🚀 ~ file: index.js ~ line 15 ~ useEffect ~ session", session)
            dataLayer.push({
                'email': session?.profile?.email,
                'event': 'userLogin'
            });
        }
    }, [session, sessionLoading])

    if (!session) return null
    return <></>
}

export default DataLayer
