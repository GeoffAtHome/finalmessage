input.onButtonPressed(Button.A, function () {
    delay = delay1
    radio.sendValue("Delay", delay)
    SplitMessageAndSend(msg1)
    DisplayMessage(MyID, msg1, delay)
})
function ProcessMessage (thisID: number, thisMessage: string, thisDelay: number) {
    if (thisMessage.charAt(1) == "^") {
        if (thisMessage.charAt(0) == "0") {
            messagePart1 = ""
        } else if (thisMessage.charAt(0) == "1") {
            messagePart1 = "" + messagePart1 + thisMessage.substr(2, 19)
        } else {
            DisplayMessage(thisID, messagePart1, thisDelay)
        }
    }
}
function DisplayMessage (thisId: number, thisMessage2: string, thisDelay2: number) {
    basic.clearScreen()
    basic.pause(thisId * thisDelay2)
    loop = 1 + (thisMessage2.length - thisId)
    index = thisId
    for (let index2 = 0; index2 < loop; index2++) {
        basic.showString(thisMessage2.charAt(index))
        index += 1
    }
}
radio.onReceivedString(function (receivedString) {
    ProcessMessage(MyID, receivedString, delay)
})
input.onButtonPressed(Button.B, function () {
    delay = delay2
    radio.sendValue("Delay", delay)
    SplitMessageAndSend(msg2)
    DisplayMessage(MyID, msg2, delay)
})
radio.onReceivedValue(function (name, value) {
    if (name == "Delay") {
        delay = value
    }
})
function SplitMessageAndSend (thisMessage3: string) {
    loop = thisMessage3.length
    index = 0
    radio.sendString("0^")
    while (index <= loop) {
        radio.sendString("1^" + thisMessage3.substr(index, 16))
        index += 16
    }
    radio.sendString("2^")
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    messagePart1 = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    SplitMessageAndSend(messagePart1)
    DisplayMessage(MyID, messagePart1, delay)
})
let index = 0
let loop = 0
let messagePart1 = ""
let delay = 0
let delay2 = 0
let delay1 = 0
let msg2 = ""
let msg1 = ""
let MyID = 0
MyID = 0
msg1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
msg2 = "End"
radio.setGroup(1)
basic.showNumber(MyID)
delay1 = 0
delay2 = 400
delay = delay1
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
