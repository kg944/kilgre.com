// annotations format:
/*
 * ["annotations"]["annotations"]["😁"]["tts"]
*/
$(document).ready(function() {
    getEmojis();
});

async function getEmojis() {
    const emojis = await fetch('../data/emojis.json')
        .then((response) => response.json());
    console.log("emojis");
    console.log(emojis.emojis);

    $.each(emojis.emojis, function(i, val) {
        if (val["show"]) {
            $('.dict').append(' \
                <div class="flip-card grid-item"> \
                    <div class="flip-card-inner"> \
                        <div class="flip-card-front"> \
                            <h1>' + val["emoji"] + '</h1> \
                        </div> \
                        <div class="flip-card-back"> \
                            <p>' + val["use"] + '</p> \
                        </div> \
                    </div> \
                </div> \
            ');
        }
    });
}