const inputs = document.querySelectorAll('input')
const inputsArray = Array.from(inputs)
const rootStyle = document.documentElement.style

const changeTheme = (index) => {
    let bgColor, scColor, fontColor
    switch(index){
        case 0:
            bgColor = "hsl(224,26%,31%)"
            scColor = "hsl(224,35%,15%)"
            fontColor = "hsl(0, 0%, 100%)"
            extrafontColor = "hsl(237,12%,30%)"
            keypadColor = "hsl(223, 31%, 20%)"
            key1Color = "hsl(30, 25%, 89%)"
            key1Shadow = "hsl(28, 16%, 65%)"
            key2Color = "hsl(6, 63%, 50%)"
            key2Shadow = "hsl(6, 70%, 34%)"
            key3Color = "hsl(225, 21%, 49%)"
            key3Shadow = "hsl(224, 28%, 35%)"
            break
        case 1:
            bgColor = "hsl(0, 0%, 90%)"
            scColor = "hsl(0, 0%, 93%)"
            fontColor = "hsl(60, 10%, 19%)"
            extrafontColor = "hsl(60, 10%, 19%)"
            keypadColor = "hsl(0, 5%, 81%)"
            key1Color = "hsl(45, 7%, 89%)"
            key1Shadow = "hsl(35, 11%, 61%)"
            key2Color = "hsl(25, 98%, 40%)"
            key2Shadow = "hsl(25, 99%, 27%)"
            key3Color = "hsl(185, 42%, 37%)"
            key3Shadow = "hsl(185, 58%, 25%)"
            break
        case 2:
            bgColor = "hsl(268, 75%, 9%)"
            scColor = "hsl(268, 71%, 12%)"
            fontColor = "hsl(52, 100%, 62%)"
            extrafontColor = "hsl(52, 100%, 62%)"
            keypadColor = "hsl(268, 71%, 12%)"
            key1Color = "hsl(268, 47%, 21%)"
            key1Shadow = "hsl(290, 70%, 36%)"
            key2Color = "hsl(176, 100%, 44%)"
            key2Shadow = "hsl(177, 92%, 70%)"
            key3Color = "hsl(281, 89%, 26%)"
            key3Shadow = "hsl(285, 91%, 52%)"
            break
    }
    changeColors(bgColor, scColor, fontColor, keypadColor, key1Color, key1Shadow, key2Color, key2Shadow, key3Color, key3Shadow, extrafontColor)
}

changeColors = (bgColor, scColor, fontColor, keypadColor, key1Color, key1Shadow, key2Color, key2Shadow, key3Color, key3Shadow, extrafontColor) => {
    rootStyle.setProperty('--background-color', bgColor);
    rootStyle.setProperty('--screen-color', scColor);
    rootStyle.setProperty('--font-color', fontColor);
    rootStyle.setProperty('--font-extra-color', extrafontColor);
    rootStyle.setProperty('--keypad-color', keypadColor);
    rootStyle.setProperty('--key1-color', key1Color);
    rootStyle.setProperty('--key1-shadow', key1Shadow);
    rootStyle.setProperty('--key2-color', key2Color);
    rootStyle.setProperty('--key2-shadow', key2Shadow);
    rootStyle.setProperty('--key3-color', key3Color);
    rootStyle.setProperty('--key3-shadow', key3Shadow);
}

for (let i=0; i<=2; i++) {
    inputsArray[i].addEventListener("change", () => {
        changeTheme(i)
    })
}

document.addEventListener('keydown', function(event) {
    if (event.key==="ё") secret()
})


function secret() {
    bgColor = "hsl(224,26%,100%)"
    scColor = "hsl(35,100%,50%)"
    fontColor = "hsl(35, 100%, 50%)"
    extrafontColor = "hsl(35,100%,50%)"
    keypadColor = "hsl(35, 100%, 63%)"
    key1Color = "hsl(30, 25%, 89%)"
    key1Shadow = "hsl(28, 16%, 65%)"
    key2Color = "hsl(80, 63%, 50%)"
    key2Shadow = "hsl(30, 70%, 34%)"
    key3Color = "hsl(35, 100%, 33%)"
    key3Shadow = "hsl(35, 100%, 20%)"

    changeColors(bgColor, scColor, fontColor, keypadColor, key1Color, key1Shadow, key2Color, key2Shadow, key3Color, key3Shadow, extrafontColor)

    document.querySelector("h2").innerHTML="Secret"
}