// xml parse
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "employees.xml",
        dataType: "xml",
        success: xmlParser,
        error: function () {
            alert("Error: Something went wrong");
        }
    });
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function xmlParser(xml) {

    var teamselect = getParameterByName('team');
    var teamRegex = new RegExp(teamselect);
    var sorted = false;

    $(xml).find("Employee").each(function () {
        var teamsort = $(this).find("Team").text().toLowerCase();


        // check for team

        if (teamselect == "all") {
            picture = $(this).find("Picture").text();
            firstname = $(this).find("FirstName").text();
            lastname = $(this).find("LastName").text();
            role = $(this).find("Role").text();
            nickname = $(this).find("Nickname").text();
            hometown = $(this).find("Hometown").text();
            college = $(this).find("College").text();
            quotetext = $(this).find("QuoteText").text();
            quoteauthor = $(this).find("QuoteAuthor").text();
            tvshow = $(this).find("TvShow").text();
            petchild = $(this).find("PetChild").text();
            song = $(this).find("Song").text();
            travel = $(this).find("Travel").text();
            movie = $(this).find("Movie").text();
            hobby = $(this).find("Hobby").text();
            timeofyear = $(this).find("TimeOfYear").text();

            charValue = /\w/;

            nicknameContent = hometownContent = collegeContent = tvshowContent = petchildContent = songContent = travelContent = movieContent = hobbyContent = timeofyearContent = quoteauthorContent = "";

            if (nickname != "") {
                nicknameContent = '<p><span>Nickname(s):</span>' + nickname + '</p>'
            }
            if (hometown != "") {
                hometownContent = '<p><span>Hometown:</span>' + hometown + '</p>'
            }
            if (college != "") {
                collegeContent = '<p><span>College:</span>' + college + '</p>'
            }
            if (tvshow != "") {
                tvshowContent = '<p><span>Favorite TV Show?</span>' + tvshow + '</p>'
            }
            if (petchild != "") {
                petchildContent = '<p><span>Pets and/or children?</span>' + petchild + '</p>'
            }
            if (song != "") {
                songContent = '<p><span>Entrance/theme song?</span>' + song + '</p>'
            }
            if (travel != "") {
                travelContent = '<p><span>Favorite travel/vacation destination?</span>' + travel + '</p>'
            }
            if (movie != "") {
                movieContent = '<p><span>Favorite Movie?</span>' + movie + '</p>'
            }
            if (hobby != "") {
                hobbyContent = '<p><span>Hobbies/Interests?</span>' + hobby + '</p>'
            }
            if (timeofyear != "") {
                timeofyearContent = '<p><span>Favorite time of year?</span>' + timeofyear + '</p>'
            }
            if (quoteauthor != "") {
                quoteauthorContent = '<br>&ndash;' + quoteauthor + '</p>'
            }



            $(".wrapper").append('<div><img src="' + picture + '">' + '<div class="card-content info show">' + '<p><span>Name:</span>' + firstname + ' ' + lastname + '</p>' + '<p><span>Role:</span>' + role + '</p>' + nicknameContent + hometownContent + collegeContent + '</div>' + '<div class="card-content quote hide">' + '<p>"' + quotetext + '"' + quoteauthorContent + '</div>' + '<div class="card-content survey hide">' + tvshowContent + petchildContent + songContent + travelContent + movieContent + hobbyContent + timeofyearContent + '</div>' + '<nav class="subnav"><a href="#" class="subnav-btn info-btn default"><div class="subnav-wrap active" style="display:inline-block; width:33.33333%;"><img src="images/icon_info.png">Info</div></a><a href="#" class="subnav-btn  quote-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_quote.png">Quote</div></a><a href="#" class="subnav-btn  survey-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_survey.png">Survey</div></a> </nav></div>');
        } else {
            sorted = true;
            var manager = $(this).find("IsManager").text().toLowerCase();

            if (teamRegex.test(teamsort) && manager == 'yes') {
                picture = $(this).find("Picture").text();
                firstname = $(this).find("FirstName").text();
                lastname = $(this).find("LastName").text();
                role = $(this).find("Role").text();
                nickname = $(this).find("Nickname").text();
                hometown = $(this).find("Hometown").text();
                college = $(this).find("College").text();
                quotetext = $(this).find("QuoteText").text();
                quoteauthor = $(this).find("QuoteAuthor").text();
                tvshow = $(this).find("TvShow").text();
                petchild = $(this).find("PetChild").text();
                song = $(this).find("Song").text();
                travel = $(this).find("Travel").text();
                movie = $(this).find("Movie").text();
                hobby = $(this).find("Hobby").text();
                timeofyear = $(this).find("TimeOfYear").text();

                charValue = /\w/;

                nicknameContent = hometownContent = collegeContent = tvshowContent = petchildContent = songContent = travelContent = movieContent = hobbyContent = timeofyearContent = quoteauthorContent = "";

                if (nickname != "") {
                    nicknameContent = '<p><span>Nickname(s):</span>' + nickname + '</p>'
                }
                if (hometown != "") {
                    hometownContent = '<p><span>Hometown:</span>' + hometown + '</p>'
                }
                if (college != "") {
                    collegeContent = '<p><span>College:</span>' + college + '</p>'
                }
                if (tvshow != "") {
                    tvshowContent = '<p><span>Favorite TV Show?</span>' + tvshow + '</p>'
                }
                if (petchild != "") {
                    petchildContent = '<p><span>Pets and/or children?</span>' + petchild + '</p>'
                }
                if (song != "") {
                    songContent = '<p><span>Entrance/theme song?</span>' + song + '</p>'
                }
                if (travel != "") {
                    travelContent = '<p><span>Favorite travel/vacation destination?</span>' + travel + '</p>'
                }
                if (movie != "") {
                    movieContent = '<p><span>Favorite Movie?</span>' + movie + '</p>'
                }
                if (hobby != "") {
                    hobbyContent = '<p><span>Hobbies/Interests?</span>' + hobby + '</p>'
                }
                if (timeofyear != "") {
                    timeofyearContent = '<p><span>Favorite time of year?</span>' + timeofyear + '</p>'
                }
                if (quoteauthor != "") {
                    quoteauthorContent = '<br>&ndash;' + quoteauthor + '</p>'
                }



                $(".wrapper").append('<div><img src="' + picture + '">' + '<div class="card-content info show">' + '<p><span>Name:</span>' + firstname + ' ' + lastname + '</p>' + '<p><span>Role:</span>' + role + '</p>' + nicknameContent + hometownContent + collegeContent + '</div>' + '<div class="card-content quote hide">' + '<p>"' + quotetext + '"' + quoteauthorContent + '</div>' + '<div class="card-content survey hide">' + tvshowContent + petchildContent + songContent + travelContent + movieContent + hobbyContent + timeofyearContent + '</div>' + '<nav class="subnav"><a href="#" class="subnav-btn info-btn default"><div class="subnav-wrap active" style="display:inline-block; width:33.33333%;"><img src="images/icon_info.png">Info</div></a><a href="#" class="subnav-btn  quote-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_quote.png">Quote</div></a><a href="#" class="subnav-btn  survey-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_survey.png">Survey</div></a> </nav></div>');
            }
        }

    });

    if (sorted) {
        $(xml).find("Employee").each(function () {
			var teamsort = $(this).find("Team").text().toLowerCase();
            var manager = $(this).find("IsManager").text().toLowerCase();

            if (teamRegex.test(teamsort) && manager == "no") {
                picture = $(this).find("Picture").text();
                firstname = $(this).find("FirstName").text();
                lastname = $(this).find("LastName").text();
                role = $(this).find("Role").text();
                nickname = $(this).find("Nickname").text();
                hometown = $(this).find("Hometown").text();
                college = $(this).find("College").text();
                quotetext = $(this).find("QuoteText").text();
                quoteauthor = $(this).find("QuoteAuthor").text();
                tvshow = $(this).find("TvShow").text();
                petchild = $(this).find("PetChild").text();
                song = $(this).find("Song").text();
                travel = $(this).find("Travel").text();
                movie = $(this).find("Movie").text();
                hobby = $(this).find("Hobby").text();
                timeofyear = $(this).find("TimeOfYear").text();

                charValue = /\w/;

                nicknameContent = hometownContent = collegeContent = tvshowContent = petchildContent = songContent = travelContent = movieContent = hobbyContent = timeofyearContent = quoteauthorContent = "";

                if (nickname != "") {
                    nicknameContent = '<p><span>Nickname(s):</span>' + nickname + '</p>'
                }
                if (hometown != "") {
                    hometownContent = '<p><span>Hometown:</span>' + hometown + '</p>'
                }
                if (college != "") {
                    collegeContent = '<p><span>College:</span>' + college + '</p>'
                }
                if (tvshow != "") {
                    tvshowContent = '<p><span>Favorite TV Show?</span>' + tvshow + '</p>'
                }
                if (petchild != "") {
                    petchildContent = '<p><span>Pets and/or children?</span>' + petchild + '</p>'
                }
                if (song != "") {
                    songContent = '<p><span>Entrance/theme song?</span>' + song + '</p>'
                }
                if (travel != "") {
                    travelContent = '<p><span>Favorite travel/vacation destination?</span>' + travel + '</p>'
                }
                if (movie != "") {
                    movieContent = '<p><span>Favorite Movie?</span>' + movie + '</p>'
                }
                if (hobby != "") {
                    hobbyContent = '<p><span>Hobbies/Interests?</span>' + hobby + '</p>'
                }
                if (timeofyear != "") {
                    timeofyearContent = '<p><span>Favorite time of year?</span>' + timeofyear + '</p>'
                }
                if (quoteauthor != "") {
                    quoteauthorContent = '<br>&ndash;' + quoteauthor + '</p>'
                }



                $(".wrapper").append('<div><img src="' + picture + '">' + '<div class="card-content info show">' + '<p><span>Name:</span>' + firstname + ' ' + lastname + '</p>' + '<p><span>Role:</span>' + role + '</p>' + nicknameContent + hometownContent + collegeContent + '</div>' + '<div class="card-content quote hide">' + '<p>"' + quotetext + '"' + quoteauthorContent + '</div>' + '<div class="card-content survey hide">' + tvshowContent + petchildContent + songContent + travelContent + movieContent + hobbyContent + timeofyearContent + '</div>' + '<nav class="subnav"><a href="#" class="subnav-btn info-btn default"><div class="subnav-wrap active" style="display:inline-block; width:33.33333%;"><img src="images/icon_info.png">Info</div></a><a href="#" class="subnav-btn  quote-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_quote.png">Quote</div></a><a href="#" class="subnav-btn  survey-btn"><div class="subnav-wrap" style="display:inline-block; width:33.33333%;"><img src="images/icon_survey.png">Survey</div></a> </nav></div>');
            }
        });
    }

    $('#container').gallery();

    // swap active button
    $('.subnav-btn').on('click', function (event) {
        event.preventDefault();
        $(this).siblings().children().removeClass('active');
        $(this).children('div').addClass('active');
        $(this).parent().siblings('.card-content').removeClass('show');
        $(this).parent().siblings('.card-content').addClass('hide');
    });

    // swap card info
    $('.info-btn').on('click', function () {
        $(this).parent().siblings('.info').removeClass('hide');
        $(this).parent().siblings('.info').addClass('show');
    });

    $('.quote-btn').on('click', function () {
        $(this).parent().siblings('.quote').removeClass('hide');
        $(this).parent().siblings('.quote').addClass('show');
    });

    $('.survey-btn').on('click', function () {
        $(this).parent().siblings('.survey').removeClass('hide');
        $(this).parent().siblings('.survey').addClass('show');
    });
}