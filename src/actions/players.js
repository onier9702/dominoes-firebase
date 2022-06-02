

import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'; 

import {auth, db} from '../firebase/firebase-config';
import { types } from "../types/types";
import { loadPlayersFromFireStore } from '../helpers/loadPlayers';



export const addNewPlayer = ( name) => {

    return async(dispatch) => {
        
        
        const {uid} = auth.currentUser;

        const newPlayer = {
            
            name: name,
            JJ: 0,
            G: 0,
            P: 0,
            Dif: 0,
            PorcientoG: 0.0,
            PorcientoP: 0.0,
        };

        //Add a new document with a generated id.
        const docRef = await addDoc(collection(db, uid), newPlayer);

        let id = docRef.id;

        const playerWithId = {
            id,
            name: name,
            JJ: 0,
            G: 0,
            P: 0,
            Dif: 0,
            PorcientoG: 0.0,
            PorcientoP: 0.0,
        };
        dispatch(addingNewPlayer(playerWithId) );
        // console.log(uid,id);
        dispatch( updatingPlayer(uid, id, playerWithId) );
        dispatch(loadingPlayersList(uid));

    };

};

export const addingNewPlayer = ( player) => ({

    type: types.playerAdded,
    payload: player,

});

export const updatingPlayer = (uid, id, player) => {

    return async(dispatch) => {


        const playerRef = doc(db, uid, id);

        await updateDoc(playerRef, player);

    };

};

// export const addWonGame = ( player, JJ, G, P ) => ({

//     type: types.playerWon,
//     payload: {
    
//         ...player,
//         JJ,
//         G,
//         P,
        
//     }
// })

// export const addLostGame = ( player, JJ, G, P ) => ({

//     type: types.playerLost,
//     payload: {
        
//         ...player,
//         JJ,
//         G,
//         P,
    
//     }
// });

// export const loadPlayers = (players) => ({

//     type: types.playersLoad,
//     payload: players,
// })

export const loadingPlayersList = (uid) => {

    return async(dispatch) => {

        const list = await loadPlayersFromFireStore(uid);
        dispatch( puttingPlayersOnStore(list) );

    };

};

export const puttingPlayersOnStore = (players) => ({

    type: types.playersLoad,
    payload: players,

});
