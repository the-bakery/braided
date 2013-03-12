
var imgLine = 'images/line.png';
var imgSwap = [['images/swap-pos-top.png', 'images/swap-pos-bot.png'],
               ['images/swap-neg-top.png', 'images/swap-neg-bot.png']];

var strands = 3;
var tiers = 2;

var matrix = [[0, 1,  0, 0],
              [0, 0, -1, 0]];

var width = 62;
var height = 31;

function swap(r, c)
{
    return function(event)
    {
        if (matrix[c][r-1] || matrix[c][r+1]) return;

        var v = matrix[c][r];
        v += 1;
        if (v > 1) { v = -1; }
        matrix[c][r] = v;

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

    for (var r = 0; r < strands; r++)
    {
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
            var src = imgLine;
            if (matrix[c][r  ] == +1) { src = imgSwap[0][1]; }
            if (matrix[c][r  ] == -1) { src = imgSwap[1][1]; }
            if (matrix[c][r+1] == +1) { src = imgSwap[0][0]; }
            if (matrix[c][r+1] == -1) { src = imgSwap[1][0]; }
            img.setAttribute('src', src);
            img.setAttribute('usemap', '#' + name);
            td.appendChild(img);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function init()
{
    redraw();
}

init();
