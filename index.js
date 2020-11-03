async function test() {
    const p1 = new Promise((res, rej) => res(1))
    const p2 = new Promise((res, rej) => res(2))
    const p3 = new Promise((res, rej) => res(3))

    await new Promise(res => setTimeout(res, 2e3))

    console.log(await Promise.race([p1, p2, p3]))
}

test()
