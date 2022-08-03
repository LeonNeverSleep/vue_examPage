import $http from "./index.js";

export function getQuestions(){
    return $http.get('/home')
}