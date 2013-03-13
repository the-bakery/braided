
var imgLine = 'images/line.png';
var imgSwap = [['images/swap-pos-top.png', 'images/swap-pos-bot.png'],
               ['images/swap-neg-top.png', 'images/swap-neg-bot.png']];

var strands = 4;
var tiers = 7;

var matrix = [[0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0]
             ];

var imgMatrix = [];

var width = 62;
var height = 31;

function tangle(r, c, img)
{
    var src = imgLine;
    if (matrix[c][r  ] == +1) { src = imgSwap[0][1]; }
    if (matrix[c][r  ] == -1) { src = imgSwap[1][1]; }
    if (matrix[c][r+1] == +1) { src = imgSwap[0][0]; }
    if (matrix[c][r+1] == -1) { src = imgSwap[1][0]; }
    img.setAttribute('src', src);
}

function swap(r, c)
{
    return function(event)
    {
        if (matrix[c][r-1] || matrix[c][r+1]) return;

        var state = matrix[c][r] + 1;
        if (state > 1) { state = -1; }
        matrix[c][r] = state;

        /*
        tangle(r-1, c, imgMatrix[r-1][c]);
        tangle(r  , c, imgMatrix[r  ][c]);
        */
        redraw();
    }
}

function redraw()
{
    var table = document.getElementById('diagram');

    while ( table.hasChildNodes() )
        table.removeChild( table.firstChild );

    var halfheight = Math.floor(height / 2);
    var box0 = '0,0,' + width + ',' + halfheight;
    var box1 = halfheight + ',0,' + width + ',' + height;

    imgMatrix = [];

    for (var r = 0; r < strands; r++)
    {
        var imgRow = [];

        var tr = document.createElement('tr');
        for (var c = 0; c < tiers; c++)
        {
            var name = 'r' + r + 'c' + c;
            var td = document.createElement('td');

            var map = document.createElement('map');

            map.setAttribute('name', name);
            var area0 = document.createElement('area');
            area0.setAttribute('shape', 'rect');
            area0.setAttribute('coords', box0);
            if (r > 0)
                area0.addEventListener('click', swap(r, c), false);
            map.appendChild(area0);

            var area1 = document.createElement('area');
            area1.setAttribute('shape', 'rect');
            area1.setAttribute('coords', box1);
            if (r+1 < strands)
                area1.addEventListener('click', swap(r+1, c), false);
            map.appendChild(area1);

            td.appendChild(map);

            var img = document.createElement('img');
            tangle(r, c, img);
            img.setAttribute('usemap', '#' + name);
            td.appendChild(img);

            imgRow.push(img);

            tr.appendChild(td);
        }
        table.appendChild(tr);

        imgMatrix.push(imgRow);
    }
}

function init()
{
    redraw();
}

init();
