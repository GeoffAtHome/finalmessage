input.onButtonPressed(Button.A, function () {
    delay = delay1
    radio.sendValue("Delay", delay)
    SplitMessageAndSend(msg1)
    DisplayMessage(MyID, msg1, delay)
})
function DisplayMessage (thisID: number, thisMessage: string, thisDelay: number) {
    basic.clearScreen()
    basic.pause(thisDelay * thisID)
    if (thisMessage.charAt(1) != "^") {
        basic.showString(thisMessage.charAt(thisID))
    } else if (16 == thisID) {
        if (thisMessage.charAt(0) == "1") {
            basic.showString(thisMessage.charAt(2 + thisID))
        }
    } else {
        if (thisMessage.charAt(0) == "2") {
            basic.showString(thisMessage.charAt(thisID - 14))
        }
    }
}
radio.onReceivedString(function (receivedString) {
    DisplayMessage(MyID, receivedString, delay)
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
function SplitMessageAndSend (thisMessage: string) {
    radio.sendString("1^" + thisMessage.substr(0, 16))
    radio.sendString("2^" + thisMessage.substr(16, 16))
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
})
let delay = 0
let delay2 = 0
let delay1 = 0
let msg2 = ""
let msg1 = ""
let MyID = 0
MyID = 24
msg1 = "Nadoligllawen***PwllCoch"
msg2 = "                        "
radio.setGroup(1)
basic.showNumber(MyID)
delay1 = 0
delay2 = 400
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
