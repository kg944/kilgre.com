// annotations format:
/*
 * ["annotations"]["annotations"]["😁"]["tts"]
 */
var searchedEmoji = '';

$(document).ready(function () {
  //source.addEventListener('input', inputHandler);
  getEmojis();

  $(':input').on('input', function (e) {
    searchedEmoji = $(this).val();
    // clear inner html of dictionary and filter by search
    $('.dict').html('');
    getEmojis();
  });
});

/* Do a horizontal flip when you move the mouse over the flip box container */
function fciclick(i) {
  var element = $('#fci-' + i);
  if (element.hasClass('flipped')) {
    $('#fci-' + i).css('transform', '');
  } else {
    $('#fci-' + i).css('transform', 'rotateY(180deg)');
  }
  $('#fci-' + i).toggleClass('flipped');
}

function displayCard(i, val) {
  if (val['show']) {
    var color = randomColorInPalette();
    var example = val['ex']['message']
      ? '<p class="example-message"><i>' +
        val['ex']['date'] +
        ': </i>"' +
        val['ex']['message'] +
        '"</p>'
      : '';
    var cardEntry =
      ' \
                  <div onclick="fciclick(' +
      i +
      ')" class="flip-card grid-item"> \
                      <div id="fci-' +
      i +
      '" class="flip-card-inner"> \
                          <div class="flip-card-front"  style="background-color:' +
      color +
      ';"> \
                              <h1 class="emoji-text">' +
      val['emoji'] +
      '</h1> \
                          </div> \
                          <div class="flip-card-back"><div class="emoji-content"> \
                              <p class="emoji-use">' +
      val['use'] +
      '</p> ' +
      example +
      '</div></div> \
                      </div> \
                  </div> \
              ';
    $('.dict').append(cardEntry);
  }
}

async function getEmojis() {
  const emojis = await fetch('../data/emojis.json').then((response) =>
    response.json(),
  );
  if (searchedEmoji) {
    $.each(emojis.emojis, function (i, val) {
      if (
        searchedEmoji.indexOf(val['emoji']) >
        -1 /* OR searchedEmoji in related[] */
      ) {
        displayCard(i, val);
      }
    });
  } else {
    $.each(emojis.emojis, function (i, val) {
      displayCard(i, val);
    });
  }
}

/**
 * Generate a random color in a nice palette
 * @returns color
 */
function randomColor() {
  var golden_ratio_conjugate = 0,
    h = (Math.random() * 0.3 + 0.099) * 360,
    rgb = hsvToRgb(h, 40, 75);
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

/**
 *
 */
function randomColorInPalette() {
  var colors = [
    '#CFE0EB',
    '#C0D4E1',
    '#A6C3E4',
    '#93B9DD',
    '#8BADD3',
    '#78A3D4',
  ];
  return colors[parseInt(Math.random() * colors.length)];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_and_HSV.
 * Assumes h is contained in the set [0, 360] and
 * s and l are contained in the set [0, 100] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var chroma = (s * v) / 10000,
    min = v / 100 - chroma,
    hdash = h / 60,
    x = chroma * (1 - Math.abs((hdash % 2) - 1)),
    r = 0,
    g = 0,
    b = 0;

  switch (true) {
    case hdash < 1:
      r = chroma;
      g = x;
      break;
    case hdash < 2:
      r = x;
      g = chroma;
      break;
    case hdash < 3:
      g = chroma;
      b = x;
      break;
    case hdash < 4:
      g = x;
      b = chroma;
      break;
    case hdash < 5:
      r = x;
      b = chroma;
      break;
    case hdash <= 6:
      r = chroma;
      b = x;
      break;
  }

  r += min;
  g += min;
  b += min;

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
