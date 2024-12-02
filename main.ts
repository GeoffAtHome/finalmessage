input.onButtonPressed(Button.A, function () {
    delay = delay1
    radio.sendValue("Delay", delay)
    radio.sendString(msg1)
    DisplayMessage(MyID, msg1, delay)
})
function DisplayMessage (thisID: number, thisMessage: string, thisDelay: number) {
    basic.clearScreen()
    basic.pause(thisDelay * thisID)
    basic.showString(thisMessage.charAt(thisID))
}
radio.onReceivedString(function (receivedString) {
    DisplayMessage(MyID, receivedString, delay)
})
input.onButtonPressed(Button.B, function () {
    delay = delay2
    radio.sendValue("Delay", delay)
    radio.sendString(msg2)
    DisplayMessage(MyID, msg2, delay)
})
radio.onReceivedValue(function (name, value) {
    if (name == "Delay") {
        delay = value
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
})
let delay = 0
let delay2 = 0
let delay1 = 0
let msg2 = ""
let msg1 = ""
let MyID = 0
MyID = 0
msg1 = "Zero"
msg2 = "ZERO"
radio.setGroup(1)
basic.showNumber(MyID)
delay1 = 0
delay2 = 400
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
