export async function delay(ms) {
    await (new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    }))
}

// 1부터 n까지의 배열에서 m개의 랜덤으로 선택된 숫자를 배열로 반환.
export function getRandomNumberArray(n, m, startIdx = 0) {
    const srcArr = new Array(n).fill(0).map((e, i) => ++i);
    const resArr = [];

    srcArr.splice(0, startIdx);

    for (let i = 0; i < m; i++) {
        const rndIdx = Math.floor(Math.random() * srcArr.length);
        resArr.push(...srcArr.splice(rndIdx, 1));
    }

    return resArr;
}
