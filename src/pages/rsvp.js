import React, { useEffect, useState } from 'react';

import DetailPageLayout from '../components/DetailPageLayout';
import { getFirebase } from '../../firebase'

export default () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')
      
        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            const database = getFirebase(firebase).database()
            // do something with `database` here,
            // or store it as an instance variable or in state
            // to do stuff with it later
            database.ref('/guests/').on('value', snap => {
                console.log(snap.val())
                setData(snap.val())
            })
        })     
    }, []);
    return <DetailPageLayout>
        <div>
            { data.map(item => {
                return <div key={item.name}>
                    { item.name }
                </div>
            }) } 
        </div>
    </DetailPageLayout>
}