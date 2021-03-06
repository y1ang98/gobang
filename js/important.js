//拿到画布
var chess = document.getElementById('canvas');
//获取权限
var context = chess.getContext('2d');
//线条颜色
context.strokeStyle = "#bcbcbc";
//画棋盘
var drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
        context.beginPath();
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(15, 15 + i * 30)
        context.lineTo(435, 15 + i * 30);
        context.closePath();
        context.stroke();
    }
}
drawChessBoard();

//画圆
//context.arc(x,y,r,开始，结束)
var onStep = function (i, j, me) {
    context.beginPath();//开始路径
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2);
    context.closePath();//结束路径
    context.stroke();//绘制
    //设置渐变颜色
    var gradient = context.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 15 + i * 30, 15 + j * 30, 0);

    if (me) {
        gradient.addColorStop(0, "#0a0a0a");//0a0a0a
        gradient.addColorStop(1, "#b3b3ff");//#636766
    } else {

        gradient.addColorStop(0, "#ff9933");//#d1d1d1
        gradient.addColorStop(1, "#f9f9f9");//#f9f9f9
    }
    context.fillStyle = gradient;
    context.fill();//填充
}
//结束标志
var over = false;
var me = true;
//定义一个二维数组来保存棋盘上面的落子情况
var chessBoard = [];
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}
chess.onclick = function (e) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }
    //获取鼠标坐标
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);//向下取整
    var j = Math.floor(y / 30);

    if (chessBoard[i][j] == 0) {
        onStep(i, j, me);
        chessBoard[i][j] = 1;
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    alert("Unbelievable 你赢啦！");
                    over = true;
                }
            }
        }
        if (!over) {
            me = !me;
            computerAI();
        }
    }
}

//制定输赢的规则
var wins = [];
//遍历棋盘
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }

}
var count = 0;//赢法的索引
//横线赢的方法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
//竖线赢的方法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

//斜线赢的算法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

//反斜线赢的算法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

//console.log(count);赢法

//赢法统计数组
var myWin = [];
var computerWin = [];
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}

//计算机AI算法
var computerAI = function () {
    //我方分数
    var mySource = [];
    //计算机分数
    var computerSource = [];
    var max = 0;//保存最高点的分数
    var u = 0, v = 0;//保存最高点分数的坐标

    for (var i = 0; i < 15; i++) {
        mySource[i] = [];//我方分数
        computerSource[i] = [];//计算机分数
        //初始化分数
        for (var j = 0; j < 15; j++) {
            mySource[i][j] = 0;
            computerSource[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        //我方下棋
                        if (myWin[k] == 1) {
                            mySource[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            mySource[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            mySource[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            mySource[i][j] += 10000;
                        } else {

                        }

                        //计算机下棋
                        if (computerWin[k] == 1) {
                            computerSource[i][j] += 200;
                        } else if (computerWin[k] == 2) {
                            computerSource[i][j] += 400;
                        } else if (computerWin[k] == 3) {
                            computerSource[i][j] += 2000;
                        } else if (computerWin[k] == 4) {
                            computerSource[i][j] += 10000;
                        } else {

                        }

                    }
                }
                //我方
                if (mySource[i][j] > max) {
                    max = mySource[i][j];
                    u = i;
                    v = j;
                }
                if (mySource[i][j] == max) {
                    if (computerSource[i][j] > computerSource[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                //计算机
                if (computerSource[i][j] > max) {
                    max = computerSource[i][j];
                    u = i;
                    v = j;
                }
                if (computerSource[i][j] == max) {
                    if (mySource[i][j] > mySource[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    onStep(u, v, false);
    chessBoard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                over = true;
                alert("你输啦，还要继续努力噢");
            }
        }
    }
    if (!over) {
        me = !me;
    }
}