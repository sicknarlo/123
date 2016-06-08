$(document).ready(function() {

    $('#updateDB').click(function() {
        if ($('#pw').val() == "2ez2no") {
            $.getJSON('convertcsv.json',function(data){
                $.each(data,function(i,player){
                    dpd.players.post({
                        "name": player.name,
                        "position":player.position,
                        "team": player.team,
                        "draftYear": player.draft_year,
                        "twitterUsername": player.twitter_username,
                        "statsID": player.stats_id,
                        "weight": player.weight,
                        "college":player.college,
                        "draftRound":player.draft_round,
                        "height": player.height,
                        "rotoworldID":player.rotoworld_id,
                        "nflID": player.nfl_id,
                        "espnID":player.espn_id,
                        "birthdate":player.birthdate,
                        "status":player.status,
                        "may16ADP":player.may_16,
                        "may16Value":player.may_16_value,
                        "apr16ADP":player.apr_16,
                        "apr16Value":player.apr_16_value,
                        "mar16ADP":player.mar_16,
                        "mar16Value":player.mar_16_value,
                        "feb16ADP":player.feb_16,
                        "feb16Value":player.feb_16_value,
                        "jan16ADP":player.jan_16,
                        "jan16Value":player.jan_16_value,
                        "dec15ADP":player.dec_15,
                        "dec15Value":player.dec_15_value,
                        "nov15ADP":player.nov_15,
                        "nov15Value":player.nov_15_value,
                        "oct15ADP":player.oct_15,
                        "oct15Value":player.oct_15_value,
                        "sept15ADP":player.sept_15,
                        "sept15Value":player.sept_15_value
                    }, function(result, err) {
                        if(err) return console.log(err);
                        console.log(result, result.id);
                    });
                });
            }).error(function(){
                console.log('error');
            });
        }
    })

    $('#calcTrend').click(function() {
        if ($('#pw').val() == "2ez2no") {

            dpd.players.get(function (result, err) {
                if(err) return console.log(err);
                var idArray = [];
                $.each(result,function(i,player){
                    console.log(player);
                    idArray.push([player.id, player.may16ADP, player.mar16ADP]);
                });

                console.log(idArray);

                for (var i=0; i<idArray.length; i++) {
                    dpd.players.put(idArray[i][0], {
                        "trend": parseInt(idArray[i][1]) - parseInt(idArray[i][2])},
                        function(result2, err2) {
                            if(err2) return console.log(err2);
                            console.log(result2);
                            console.log(result2.trend);
                        });
                }
            });
        }
    })

    $('#comment-form').submit(function() {
        //Get the data from the form
        var name = $('#name').val();
        var comment = $('#comment').val();

        //Clear the form elements
        $('#name').val('');
        $('#comment').val('');

        addComment({
            name: name,
            comment: comment
        });

        return false;
    });

    function addComment(comment) {
        $('<div class="comment">')
            .append('<div class="author">Posted by: ' + comment.name + '</div>')
            .append('<p>' + comment.comment + '</p>')
            .appendTo('#comments');
    }

});