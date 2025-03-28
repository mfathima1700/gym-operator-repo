"use client";

import {
  GET_EXERCISE_FAILED,
  GET_EXERCISE_SUCCESS,
  GET_NUTRITION_FAILED,
  GET_NUTRITION_SUCCESS,
} from "../constants/NutritionConstants";
import axios from "axios";

/*
export async function getExerciseData(activity: string, weight: number) {
  try {

// const options = {
//     (
//         "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
//         {
//           params: {
//             activity: activity,
//             weight: weight,
//           },
//           headers: {
//             "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
//             "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
//           },
//         }
//       );
// }

const options = {
    method: 'GET',
    url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: {name: activity},
    headers: {
      'x-rapidapi-key': '40ce7cd81emsh47e0fc34c5755bap1db808jsn0c1c32594799',
      'x-rapidapi-host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
  };

    const response = await axios.request(options)

    console.log("GET API NINJA STUFF SUCCESS");
    console.log(response.data);

    return {
      type: GET_EXERCISE_SUCCESS,
      payload: response.data,
    };
  } catch (error) {
    console.log("GET API NINJA STUFF FAILED");
    return {
      type: GET_EXERCISE_FAILED,
      payload: error,
    };
  }
}*/

export async function getExerciseData(activity: string, weight: number, duration: number) {
    try {
  
      const apiKey = process.env.NEXT_PUBLIC_NINJA_API_KEY
      const response = await axios.get('https://api.api-ninjas.com/v1/caloriesburned', {
        params: {
            activity: activity,
            weight: weight,
            duration:duration
        },
        headers: {
            'X-Api-Key': apiKey
        }
    });
  
      console.log("GET API NINJA STUFF SUCCESS");
      console.log(response.data);
  
      return {
        type: GET_EXERCISE_SUCCESS,
        payload: response.data,
      };
    } catch (error) {
      console.log("GET API NINJA STUFF FAILED");
      return {
        type: GET_EXERCISE_FAILED,
        payload: error,
      };
    }
  }

export async function getNutritionData(foods: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NINJA_API_KEY;
    const response = await axios.get('https://api.api-ninjas.com/v1/nutrition', {
        params: {
            query: foods // The food item to analyze (e.g., "1lb brisket and fries")
        },
        headers: {
            'X-Api-Key': apiKey
        }
    });

    console.log("GET EDAMAM STUFF SUCCESS");
    console.log(response.data);
    
    return {
      type: GET_NUTRITION_SUCCESS,
      payload: response.data,
    };
  } catch (error) {
    console.log("GET EDAMAM STUFF FAILURE");

    return {
      type: GET_NUTRITION_FAILED,
      payload: error,
    };
  }
}
