const [c0, c9, ca] = '09A'.split('').map(c => c.charCodeAt(0))

// 十六进制转十进制，输入字符串为全大写
function h2d(hex) {
    let d = 0;
    for (let i = 0; i < hex.length; i++) {
        const x = hex.charCodeAt(i)
        d = d << 4 | (x > c9 ? x - (ca - 10) : x - c0)
    }
    return d;
}

console.log(h2d("1A5C") === 6748)
console.log(h2d("271") === 625)
