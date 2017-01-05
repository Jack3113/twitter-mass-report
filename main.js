function getTwitterID(username) {
    if (username !== null && username !== '') {
        var req = new XMLHttpRequest();
        req.open('GET', 'http://hackjack.info/getTwitterID.php?username=' + username, true);
        req.onreadystatechange = function(aEvt) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var userID = req.responseText;
                    if (userID !== null && userID !== '') {
                        var userSection = document.createElement('div');
                        userSection.setAttribute('class', 'user');
                        var userName = document.createElement('div');
                        userName.setAttribute('class', 'username');
                        userName.innerHTML = '@' + username;
                        var reportLink = document.createElement('a');
                        reportLink.setAttribute('href', 'https://twitter.com/i/safety/report_story?next_view=report_story_start&profile_id=' + userID + '&reported_user_id=' + userID);
                        reportLink.setAttribute('target', '_blank');
                        reportLink.setAttribute('class', 'reportLink');
                        reportLink.innerHTML = 'Report';
                        var profileLink = document.createElement('a');
                        profileLink.setAttribute('href', 'https://twitter.com/intent/user?user_id=' + userID);
                        profileLink.setAttribute('target', '_blank');
                        profileLink.setAttribute('class', 'profileLink');
                        profileLink.innerHTML = 'Display profile';
                        userSection.appendChild(userName);
                        userSection.appendChild(profileLink);
                        userSection.appendChild(reportLink);
                        document.getElementById('results-content').appendChild(userSection);
                    } else {
                        console.error('Unknown username: ' + username);
                    }
                } else {
                    console.error('Error with idfromuser: ' + username);
                }
            }
        };
        req.send(null);
    } else {
        console.error('Empty username');
    }
}

window.addEventListener('load', function() {
    var submit = document.getElementById('submit-usernames');
    var results = document.getElementById('results');
    submit.addEventListener('submit', function(e) {
        e.preventDefault();
        var usernames = document.getElementById('usernames').value;
        var usernamesArray = usernames.split('\n');
        usernamesArray = usernamesArray.map(function(name) {
            if (name[0] === '@') {
                return name.substring(1);
            }
            return name;
        });
        if (usernamesArray.length > 0) {
            results.style.display = 'block';
            document.getElementById('results-content').innerHTML = '';
            usernamesArray.forEach(getTwitterID)
        }
    });
});