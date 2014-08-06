var teamselect = 'all';

$(".sortbutton").click(function () {
    teamselect = $(this).attr('id');
    xmlReload();
    $(".sortbutton").removeClass("activebutton");
    $(this).addClass("activebutton");
});

// xml parse
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "employees.xml",
        dataType: "xml",
        success: xmlParser,
        error: function () {
            alert("Error: Your XML file contains an error");
        }
    });
});

function xmlParser(xml) {

    count = 0;

    var teamRegex = new RegExp(teamselect);
    var sorted = false;

    $("body").append('<div id="container" class="isotope"></div>');

    $(xml).find("Employee").each(function () {
        if (teamselect == 'all') {
            manager = $(this).find("IsManager").text().toLowerCase();

            if (manager == 'yes') {
                managerclass = 'profilemanage';
            } else {
                managerclass = 'profile';
            }

            teamsort = $(this).find("Team").text().toLowerCase();
            teamsort = ' ' + teamsort;

            $("#container").append('<div class="item' + teamsort + '"><a class="fancybox fancybox.iframe" href="slider.html?team=' + teamselect + '&count=' + count + '"><div class="' + managerclass + '" style="background:url(' + $(this).find("Thumbnail").text() + '); background-size:cover; background-repeat:no-repeat;">&nbsp;</div></a><h3 class="name">' + $(this).find("LastName").text() + ', ' + $(this).find("FirstName").text() + '</h3><span class="team">' + $(this).find("Team").text() + '</span></div>');
            count++;
        } else {
            sorted = true;
            teamStr = $(this).find("Team").text().toLowerCase();
            manager = $(this).find("IsManager").text().toLowerCase();

            if (teamRegex.test(teamStr) && manager == 'yes') {
                managerclass = 'profilemanage';

                teamsort = $(this).find("Team").text().toLowerCase();
                teamsort = ' ' + teamsort;

                $("#container").append('<div class="item' + teamsort + '"><a class="fancybox fancybox.iframe" href="slider.html?team=' + teamselect + '&count=' + count + '"><div class="' + managerclass + '" style="background:url(' + $(this).find("Thumbnail").text() + '); background-size:cover; background-repeat:no-repeat;">&nbsp;</div></a><h3 class="name">' + $(this).find("LastName").text() + ', ' + $(this).find("FirstName").text() + '</h3><span class="team">' + $(this).find("Team").text() + '</span></div>');
                count++;
            }
        }
    });

    if (sorted) {
        $(xml).find("Employee").each(function () {
            teamStr = $(this).find("Team").text().toLowerCase();
            manager = $(this).find("IsManager").text().toLowerCase();

            if (teamRegex.test(teamStr) && manager == 'no') {
                managerclass = 'profile';

                teamsort = $(this).find("Team").text().toLowerCase();
                teamsort = ' ' + teamsort;

                $("#container").append('<div class="item' + teamsort + '"><a class="fancybox fancybox.iframe" href="slider.html?team=' + teamselect + '&count=' + count + '"><div class="' + managerclass + '" style="background:url(' + $(this).find("Thumbnail").text() + '); background-size:cover; background-repeat:no-repeat;">&nbsp;</div></a><h3 class="name">' + $(this).find("LastName").text() + ', ' + $(this).find("FirstName").text() + '</h3><span class="team">' + $(this).find("Team").text() + '</span></div>');
                count++;
            }
        });
    }

    $('#container').isotope({
        itemSelector: '.item',
        sortBy: 'name',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: 10
        }
    })
};

function xmlReload() {
    $("#container").remove();
    $.ajax({
        type: "GET",
        url: "employees.xml",
        dataType: "xml",
        success: xmlParser,
        error: function () {
            alert("Error: Your XML file contains an error");
        }
    });
};