const User = require('../models/user.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')
const axios = require('axios')

const testRevisions = require('../testrevisions.json')
const testScores = require('../testscores.json')


router.get('/analyze/handicap-projection', authenticate, async (req, res) => {

    
    debugger
    const current_date = new Date();
    const current_date_day = ("0" + current_date.getDate()).slice(-2)
    const current_date_month = ("0" + (current_date.getMonth() + 1)).slice(-2)
    const current_date_year = current_date.getFullYear()
    const current_date_lastYear = current_date.getFullYear() - 1


    const redux = (array, keys_to_keep) => array.map(o => keys_to_keep.reduce((acc, curr) => {
        acc[curr] = o[curr]
        return acc
    }, {}))
    

    //const url = 'https://api2.ghin.com/api/v1/golfers/'+req.user.ghin_number+'/scores.json?'
    const scoresURL = 'https://api2.ghin.com/api/v1/scores.json?golfer_id='+req.user.ghin_number+'&offset=0&limit=20&statuses=Validated'
    const requestOptions = {
        headers: {
            authorization: 'Bearer ' +req.user.ghin_token
        }
    }

    const indexesURL = 'https://api2.ghin.com/api/v1/golfermethods.asmx/HandicapHistory.json?username=GHIN2020&password=GHIN2020&club=0&ghin_number='+req.user.ghin_number+'&revCount=0&assoc=0&service=0&date_begin='+ current_date_lastYear + '-' + current_date_month + '-' + current_date_day + '&date_end=' + current_date_year + '-' + current_date_month + '-' + current_date_day

    try {


        //const indexesResponse = await axios.get(indexesURL)
        const indexesResponse = testRevisions
        const indexData = indexesResponse.data.handicap_revisions
        const reducedIndexData = redux(indexData, ['Value', 'RevDate'])
        reducedIndexData.map(o => o['type'] = 'confirmed')
        

        //const scoresResponse = await axios.get(scoresURL, requestOptions)
        const scoresResponse = testScores
        const scoresData = scoresResponse.data.scores
        const reducedScoresData = redux(scoresData, ['played_at','differential'])
        reducedScoresData.sort((a,b) => {
            if(Date.parse(a.played_at) < Date.parse(b.played_at)) {
                return -1
            } else {
                return 1
            }
        })
        

        const calculateHandicap = function (scores) {
            scores.sort((a,b) => {
                if(a.differential < b.differential) {
                    return -1
                } else {
                    return 1
                }
            })
            let scores_best_8 = scores.slice(0, 8)

            var sum_of_diffs = 0
            for(var i=0; i<8; i++) {
                sum_of_diffs += scores_best_8[i].differential
            }

            return sum_of_diffs / 8
        }


        const rounds_to_checkpoint = 3
        for(var i=0 ; i < rounds_to_checkpoint ; i++) {
            reducedScoresData.push({
                played_at: "2021-01-30",
                differential: 3.0
            })
            reducedScoresData.shift()
            let handicap = calculateHandicap(reducedScoresData.slice())
            reducedIndexData.push({
                Value: handicap,
                RevDate: "2020-02-24T00:00:00",
                type: "prospective"
            })
        }

        res.status(200).send({
            test: reducedIndexData
        })

    } catch(e) {
        res.status(500).send(e)
    }
    
  })

module.exports = router