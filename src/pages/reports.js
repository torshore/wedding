import React, { useEffect, useState } from 'react';
import { getFirebase } from '../../firebase';

import '../styles/reports.scss';

export default function Reports() {
    const [data, setData] = useState(null);
    const getCount = (array) => {
        return array.length
    }
    const ConfirmedCount = (data) => {
        
        let countedGuests = data.filter(guest => {
            return !!guest.attending
        })
        const array = []
        countedGuests.forEach(guest => {
            if (guest.guests){
                array.push(guest.guests.length)
            }
        })
        const sum = array.reduce((a, b) => a + b, 0)
        return sum

    }

    const dinnerCount = (data, type) => {
        let countedGuests = data.filter(guest => {
            return !!guest.attending
        })
        const array = []
        countedGuests.forEach(guest => {
            if (guest.guests){
                guest.guests.forEach(confirmedGuest => {
                    if (confirmedGuest.dinner === type){
                        array.push(1)
                    }
                })
            }
        })
        const sum = array.reduce((a, b) => a + b, 0)
        return sum
    }

    useEffect(() => {
        const lazyApp = import('firebase/app');
        const lazyDatabase = import('firebase/database');
      
        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            const database = getFirebase(firebase).database()
            // do something with `database` here,
            // or store it as an instance variable or in state
            // to do stuff with it later
            database.ref('/guests/').on('value', snap => {
                setData(snap.val());
            })
        })     
    }, []);

    return <div className='reports'>
        <p className='title'>
            Report
        </p>
        <p>
            Confirmed Guest Count: {data ? ConfirmedCount(data) : ''}
        </p>
        <p>
           Chicken Count: {data ? dinnerCount(data, 'Chicken') : ''} 
        </p>
        <p>
           Beef Count: {data ? dinnerCount(data, 'Beef') : ''} 
        </p>
        <p>
           Vegetarian Count: {data ? dinnerCount(data, 'Vegetarian') : ''} 
        </p>
        <p>
           Kids Meal Count: {data ? dinnerCount(data, 'Kids Meal') : ''} 
        </p>
        { data ? data.map((guest, index) => {
            return <div key={index}>
                { guest.attending ?
                    <div className='report-container'>
                        <div className='parties-list'>
                            <div>
                                { guest.name }
                            </div>
                        </div>
                        <div className='count'>
                            <div>
                                { guest.guests ? getCount(guest.guests) : 'Did not confirm guests'}
                            </div>
                        </div>
                        <div className='list'>
                            { guest.guests ? 
                                guest.guests.map((confirmedGuest, index) => {
                                    return <div key={index} className='confirmed-guest'>
                                            {index + 1}) {confirmedGuest.name}   
                                        </div>
                                })
                            : ''}
                        </div>
                    </div> :
                    ''}
            </div>
        }) : ''}
    </div>
}