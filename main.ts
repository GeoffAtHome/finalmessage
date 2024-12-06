function SetMode () {
    if (mode == 0) {
        delay = 0
        scroll = 0
    } else if (mode == 1) {
        delay = 400
        scroll = 0
    } else if (mode == 2) {
        delay = 0
        scroll = 200
    } else {
        delay = 400
        scroll = 200
    }
}
input.onButtonPressed(Button.A, function () {
    SplitMessageAndSend(msg1)
})
function ProcessMessage (thisMessage: string) {
    if (thisMessage.charAt(1) == "^") {
        if (thisMessage.charAt(0) == "0") {
            message = "" + message + thisMessage.substr(2, 19)
        } else if (thisMessage.charAt(0) == "1") {
            DisplayMessage(message)
            message = ""
        }
    }
}
function DisplayMessage (thisMessage: string) {
    basic.clearScreen()
    basic.pause(MyID * delay)
    if (scroll == 0) {
        loop = 1
    } else {
        loop = 1 + (thisMessage.length - MyID)
    }
    index = MyID
    for (let index2 = 0; index2 < loop; index2++) {
        basic.showString(thisMessage.charAt(index))
        basic.pause(scroll)
        index += 1
    }
}
input.onButtonPressed(Button.AB, function () {
    mode += 1
    if (mode == 4) {
        mode = 0
    }
    radio.sendValue("Mode", mode)
    SetMode()
    basic.showString("" + String.fromCharCode("0".charCodeAt(0) + mode) + " Mode")
})
radio.onReceivedString(function (receivedString) {
    ProcessMessage(receivedString)
})
input.onButtonPressed(Button.B, function () {
    SplitMessageAndSend(msg2)
})
radio.onReceivedValue(function (name, value) {
    if (name == "Mode") {
        mode = value
        SetMode()
    }
})
function SplitMessageAndSend (thisMessage: string) {
    loop = thisMessage.length
    index = 0
    while (index <= loop) {
        radio.sendString("0^" + thisMessage.substr(index, 16))
        index += 16
    }
    radio.sendString("1^")
    DisplayMessage(thisMessage)
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    message = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    SplitMessageAndSend(message)
})
let index = 0
let loop = 0
let message = ""
let scroll = 0
let delay = 0
let mode = 0
let msg2 = ""
let msg1 = ""
let MyID = 0
MyID = 3
msg1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
msg2 = "End"
radio.setGroup(1)
basic.showNumber(MyID)
mode = 0
SetMode()
