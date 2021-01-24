const User = require('../models/user.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')
const axios = require('axios')


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


        const scoresResponse = await axios.get(scoresURL, requestOptions)
        const indexesResponse = await axios.get(indexesURL)
        const indexData = indexesResponse.data.handicap_revisions

        const reducedIndexData = redux(indexData, ['Value', 'RevDate'])
        reducedIndexData.map(o => o['type'] = 'confirmed')
        

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
            predicted_hdcp_revisions.push({
                Value: handicap,
                RevDate: "2020-02-24T00:00:00",
                type: "prospective"
            })
        }



        /*


        const hcp_index = indexData.handicap_revisions[0].LowHIDisplay

        for (i = 0; i < scoresData.scores.length; i++) {
            
            diffArray.push(scoresData.scores[i].differential)
            
            if(courseArrayBrev.indexOf(scoresData.scores[i].course_display_value) === -1) {
                courseArrayBrev.push(scoresData.scores[i].course_display_value)
                courseArray.push({
                    course: scoresData.scores[i].course_display_value,
                    tee: scoresData.scores[i].tee_name,
                    rating: scoresData.scores[i].course_rating,
                    slope: scoresData.scores[i].slope_rating
                })
            }
        }
        
        //create list of index's
        for(i=0; i< rounds; i++) {
            indexArray.push(
                {
                    score: goalDiff,
                    date: 'NA',
                    type: 'prospective'
                }
            )
        }
        
        for (i = 0; i < indexData.handicap_revisions.length && i < roundsToFetch; i++) {
            indexArray.push(
                {
                    score: parseFloat(indexData.handicap_revisions[i].Display),
                    date: indexData.handicap_revisions[i].RevDate,
                    type: 'confirmed'
                })
            indexArrayBasic.push(parseFloat(indexData.handicap_revisions[i].Display))
        }

        const calculateProjectedAvgDiff = function(tempDiff, numberToAdd, arrayOfDiffs) {
            var arrayOfDiffsTemp = [...arrayOfDiffs]
            for (i = 0; i < numberToAdd; i++) {
                arrayOfDiffsTemp.push(tempDiff)
            }
            
            arrayOfDiffsTemp.sort((a,b) => a-b)
    
            var total = 0
            var counter = 0
            while(counter < arrayOfDiffsTemp.length & counter < 8) {
                total = total + arrayOfDiffsTemp[counter]
                counter++
            }
            return {avg: total/counter, array: arrayOfDiffsTemp}

        }
        
        var goalDiffAdjusted = goalDiff
        var projectedAvgDiffIsNotYetFound = true
        var projectedAvgDiff = calculateProjectedAvgDiff(goalDiffAdjusted, rounds, diffArray)

        while(projectedAvgDiffIsNotYetFound) {
            if (projectedAvgDiff.avg - goalDiff > .2) {
                goalDiffAdjusted = goalDiffAdjusted - .1
                projectedAvgDiff = calculateProjectedAvgDiff(goalDiffAdjusted, rounds, diffArray)
            } else if (projectedAvgDiff.avg - goalDiff < -.2) {
                goalDiffAdjusted = goalDiffAdjusted + .1
                projectedAvgDiff = calculateProjectedAvgDiff(goalDiffAdjusted, rounds, diffArray)
            } else {
                projectedAvgDiffIsNotYetFound = false
            }
        }

        // (113 / Slope Rating) x (Adjusted Gross Score - Course Rating - PCC adjustment) = Diff
        // Adjusted Gross Score = Diff / (113 / Slope Rating) + Course Rating + PCC adjustment

        for (i = 0; i < courseArray.length; i++) {
            courseArray[i].targetScore = Math.round(goalDiffAdjusted / (113 / courseArray[i].slope) + courseArray[i].rating)
            courseArray[i].diff = goalDiffAdjusted
        }



        */

        res.status(200).send({
            test: reducedScoresData
        })

    } catch(e) {
        res.status(500).send(e)
    }
    
  })

module.exports = router