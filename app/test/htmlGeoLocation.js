


userId = localStorage.getItem('userId')
var data = {
    community: "default3"
}
userId = 'yXxdJ3l0rnWyQydcQ4FC4ZkpIY53'
var usercommunity;
let url = "https://winhacks2020-88149.firebaseio.com/Users/" + userId + ".json";
var users = axios.patch(url, data).then(resource => {
    console.log(resource)
});