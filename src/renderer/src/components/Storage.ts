export const checkForUserData = () : void => {
    const ls = localStorage.getItem('landertracker');

    const data = {
        "items": [
            { "id": 1, "obtained": false },
            { "id": 2, "obtained": false },
            { "id": 3, "obtained": false },
            { "id": 4, "obtained": false },
            { "id": 5, "obtained": false },
            { "id": 6, "obtained": false },
            { "id": 7, "obtained": false },
            { "id": 8, "obtained": false },
            { "id": 9, "obtained": false },
            { "id": 10, "obtained": false },
            { "id": 11, "obtained": false },
            { "id": 12, "obtained": false },
            { "id": 13, "obtained": false },
            { "id": 14, "obtained": false },
            { "id": 15, "obtained": false },
            { "id": 16, "obtained": false },
            { "id": 17, "obtained": false },
            { "id": 18, "obtained": false },
            { "id": 19, "obtained": false },
            { "id": 20, "obtained": false },
            { "id": 21, "obtained": false },
            { "id": 22, "obtained": false },
            { "id": 23, "obtained": false },
            { "id": 24, "obtained": false },
            { "id": 25, "obtained": false },
            { "id": 26, "obtained": false },
            { "id": 27, "obtained": false },
            { "id": 28, "obtained": false },
            { "id": 29, "obtained": false },
            { "id": 30, "obtained": false },
            { "id": 31, "obtained": false },
            { "id": 32, "obtained": false }
        ]
      }
      

    
    if (ls == null) {
        localStorage.setItem('landertracker', JSON.stringify(data));
    }
}

export const loadUserData = () => {
    const ls = localStorage.getItem('landertracker');
    if (ls != null && ls != undefined) return JSON.parse(ls);
}