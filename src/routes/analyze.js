const User = require('../models/user.js')
const express = require('express')
const router = express.Router()
const authenticate = require('../tools/authenticate.js')
const axios = require('axios')


router.get('/analyze/handicap-projection', authenticate, async (req, res) => {

    const rounds = req.query.rounds
    const roundsToFetch = 20 - rounds
    const goalDiff = parseFloat(req.query.goal)

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2)
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    let year = date_ob.getFullYear()
    let lastYear = date_ob.getFullYear() - 1
    
    //const url = 'https://api2.ghin.com/api/v1/golfers/'+req.user.ghin_number+'/scores.json?'
    const url = 'https://api2.ghin.com/api/v1/scores.json?golfer_id='+req.user.ghin_number+'&offset=0&limit='+roundsToFetch+'&statuses=Validated'
    const requestOptions = {
        headers: {
            authorization: 'Bearer ' +req.user.ghin_token
        }
    }

    const url2 = 'https://api2.ghin.com/api/v1/golfermethods.asmx/HandicapHistory.json?username=GHIN2020&password=GHIN2020&club=0&ghin_number='+req.user.ghin_number+'&revCount=0&assoc=0&service=0&date_begin='+ lastYear + '-' + month + '-' + date + '&date_end=' + year + '-' + month + '-' + date

    try {
        const diffArray = []
        const courseArrayBrev = []
        const courseArray = []
        var indexArray = []
        var indexArrayBasic = []

        const response = await axios.get(url, requestOptions)
        const response2 = await axios.get(url2)
        const dataObject = response.data
        const indexListDataObject = response2.data

        const hcp_index = indexListDataObject.handicap_revisions[0].LowHIDisplay

        for (i = 0; i < dataObject.scores.length; i++) {
            
            diffArray.push(dataObject.scores[i].differential)
            
            if(courseArrayBrev.indexOf(dataObject.scores[i].course_display_value) === -1) {
                courseArrayBrev.push(dataObject.scores[i].course_display_value)
                courseArray.push({
                    course: dataObject.scores[i].course_display_value,
                    tee: dataObject.scores[i].tee_name,
                    rating: dataObject.scores[i].course_rating,
                    slope: dataObject.scores[i].slope_rating
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
        
        for (i = 0; i < indexListDataObject.handicap_revisions.length && i < roundsToFetch; i++) {
            indexArray.push(
                {
                    score: parseFloat(indexListDataObject.handicap_revisions[i].Display),
                    date: indexListDataObject.handicap_revisions[i].RevDate,
                    type: 'confirmed'
                })
            indexArrayBasic.push(parseFloat(indexListDataObject.handicap_revisions[i].Display))
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

        res.status(200).send({
            course: courseArray,
            indexArray,
            indexData: {
                currentIndex: hcp_index,
                goalIndex: goalDiff,
                projectedIndex: projectedAvgDiff.avg,
                maxIndex: Math.max(...indexArrayBasic),
                minIndex: Math.min(...indexArrayBasic)
            }
        })

    } catch(e) {
        res.status(500).send(e)
    }
    
  })

module.exports = router