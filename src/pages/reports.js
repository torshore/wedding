import React, { useEffect, useState } from 'react';
import { getFirebase } from '../../firebase';

import DetailPageLayout from '../components/DetailPageLayout.jsx';
import Spinner from '../components/Spinner.jsx';

import '../styles/reports.scss';

export default function Reports() {
    const [data, setData] = useState(null);
    // const getCount = (array) => {
    //     return array.length
    // }
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

    const notAttendingCount = (data) => {
        let countedGuests = data.filter(guest => {
            return guest.attending === false
        })

        console.log(countedGuests)

        return countedGuests.length
    }

    // const dinnerCount = (data, type) => {
    //     let countedGuests = data.filter(guest => {
    //         return !!guest.attending
    //     })
    //     const array = []
    //     countedGuests.forEach(guest => {
    //         if (guest.guests){
    //             guest.guests.forEach(confirmedGuest => {
    //                 if (confirmedGuest.dinner === type){
    //                     array.push(1)
    //                 }
    //             })
    //         }
    //     })
    //     const sum = array.reduce((a, b) => a + b, 0)
    //     return sum
    // }

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

    return <DetailPageLayout>
        <div className='reports'>
            <p className='title'>
                Report
            </p>
            <p>Confirmed Guest Count: {data ? ConfirmedCount(data) : ''}</p>
            <p> Not Attending Count: {data ? notAttendingCount(data) : ''}</p>
            
            {data 
                ? <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Choice</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((guestGroup) => {
                            return guestGroup.guests && guestGroup.guests.map((singleGuest, singleGuestIndex) =>
                                <tr key={singleGuestIndex}>
                                    <td>{singleGuest.name}</td>
                                    <td>{singleGuest.dinner}</td>
                                    <td>{guestGroup.message}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                : <Spinner />
            }
        </div>
    </DetailPageLayout>
}

{/*
    return <div key={index}>
        {guest.attending
            ?  <div className='report-container'>
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
                        { guest.guests
                            ? guest.guests.map((confirmedGuest, index) => {
                                return <div key={index} className='confirmed-guest'>
                                    {index + 1}) {confirmedGuest.name}
                                </div>
                            })
                            :  ''}
                    </div>
                </div>
            : ''
        }
        </div>
*/}